import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'
import { REDUCED_TAG_ALIAS } from '../../constants/global.js'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TagService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Tag removed')
    }

    return result
  }

  async find(params) {
    const result = await super.find({
      ...params,
      query: {
        deleted_at: null,
        $select: params.getReduced ? REDUCED_TAG_ALIAS : '*',
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
    name: 'tag'
  }
}
