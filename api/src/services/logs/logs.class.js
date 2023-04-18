import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'
import { REDUCED_TAGS_ALIAS } from '../../constants/global.js'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LogService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Log removed')
    }

    return result
  }

  async find(params) {
    console.log(params)
    // todo
    const result = await super.find({ ...params })

    return result
  }

  async create(data, params) {
    const log = await super.create(data, params)

    if (params.logTagsFound.length > 0) {
      const logTagRows = params.logTagsFound.map((tag) => {
        return {
          log_id: log.id,
          tag_id: tag.id
        }
      })

      await this.db().from('log_tag').insert(logTagRows)
    }

    return {
      ...log,
      tags: params.logTagsFound ? params.logTagsFound : []
    }
  }

  async getReducedTags(tagIds) {
    return this.db()
      .select(...REDUCED_TAGS_ALIAS)
      .from('tag')
      .whereIn('tag.id', tagIds)
  }

  async getLogToTagRows(logIds) {
    return this.db().select('*').from('log_tag').whereIn('log_tag.log_id', logIds)
  }

  getLogToTagIdsObject(logTagRows) {
    return logTagRows.reduce(
      (acc, row) => {
        if (!acc.tagIds.includes(row.tag_id)) acc.tagIds.push(row.tag_id)
        if (!acc.logIds[row.log_id]) acc.logIds[row.log_id] = []

        acc.logIds[row.log_id].push(row.tag_id)

        return acc
      },
      { tagIds: [], logIds: {} }
    )
  }

  async find(params) {
    const res = await super.find(params)
    const logIds = res.data.map((log) => log.id)

    const logToTagRows = await this.getLogToTagRows(logIds)
    const logTagIdData = this.getLogToTagIdsObject(logToTagRows)
    const tagsRelated = await this.getReducedTags(logTagIdData.tagIds)

    res.data.forEach((_item, idx) => {
      res.data[idx].tags = []

      const currentDataLogId = res.data[idx].id
      const currentDataTagIds = logTagIdData.logIds[currentDataLogId]

      if (currentDataTagIds) {
        res.data[idx].tags = currentDataTagIds.map((tagId) => tagsRelated.find((tag) => tag.id === tagId))
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
