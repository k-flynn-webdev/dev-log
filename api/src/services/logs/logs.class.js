import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LogService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Log removed')
    }

    return result
  }

  async getReducedTags(tagIds) {
    const tagsFound = await this.db()
      .select('value', 'id', 'type' )
      .from('tag')
      .whereIn('tag.id', tagIds)

    return tagsFound
  }

  async getLogToTagRows(logIds) {
    const logToColumns = await this.db()
      .from('log_tag')
      .select('*')
      .whereIn('log_tag.log_id', logIds)

    return logToColumns
  }

  getLogToTagIdsObject(logTagRows) {
    return logTagRows.reduce((acc, row) => {
      if (!acc.tagIds.includes(row.tag_id)) acc.tagIds.push(row.tag_id)
      if (!acc.logIds[row.log_id]) acc.logIds[row.log_id] = []

      acc.logIds[row.log_id].push(row.tag_id)

      return acc
    }, { tagIds: [], logIds: {}})
  }

  async find(params) {
    const res = await super.find(params);
    const logIds = res.data.map((log) => log.id)

    const logToTagRows = await this.getLogToTagRows(logIds)
    const logTagIdData = this.getLogToTagIdsObject(logToTagRows)
    const tagsRelated = await this.getReducedTags(logTagIdData.tagIds)

    res.data.forEach((_item, idx) => {
      res.data[idx].tags = []

      const currentDataLogId = res.data[idx].id
      const currentDataTagIds = logTagIdData.logIds[currentDataLogId]

      if (currentDataTagIds) {
        res.data[idx].tags = currentDataTagIds
        .map((tagId) => tagsRelated.find((tag) => tag.id === tagId))
      }
    })

    return res
  }

  async remove(id, params) {
    return super.patch(id, { deleted_at: new Date() }, params)
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'log'
  }
}
