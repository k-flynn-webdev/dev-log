import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'
import { REDUCED_LOG_ALIAS } from '../../constants/global.js'

export const createLogTagCols = (logId, tagsFound) => {
  if (!logId || !tagsFound || !tagsFound.length) return {}

  return tagsFound.map((tag) => {
    return {
      log_id: logId,
      tag_id: tag.id
    }
  })
}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LogService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Log removed')
    }

    return result
  }

  async create(data, params) {
    const log = await super.create(data, params)

    if (params.logTagFound.length > 0) {
      const logTagRows = createLogTagCols(log.id, params.logTagFound)

      // todo: move this into own methods service / investigate
      await this.db().from('log_tag').insert(logTagRows)
    }

    return {
      ...log,
      tag: params.logTagFound ? params.logTagFound : []
    }
  }

  async getLogToTagRows(logIds) {
    return this.db().select('*').from('log_tag').whereIn('log_tag.log_id', logIds)
  }

  async find(params) {
    const result = await super.find({
      ...params,
      query: {
        deleted_at: null,
        $select: params.getReduced ? REDUCED_LOG_ALIAS : '*',
        ...params.query
      }
    })

    const ERROR_MSG = 'No Tag found'

    if (result && result.data && result.data.length === 0) {
      throw new NotFound(ERROR_MSG)
    }

    if (result && Array.isArray(result) && result.length === 0) {
      throw new NotFound(ERROR_MSG)
    }

    return result
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
