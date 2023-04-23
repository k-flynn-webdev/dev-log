import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'
import { REDUCED_TAG_TYPE_ALIAS } from '../../constants/global.js'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TagTypeService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Tag Type removed')
    }

    return result
  }

  async getAll() {
    return this.db()
      .select(...REDUCED_TAG_TYPE_ALIAS)
      .whereNull('tag_type.deleted_at')
  }

  async remove(id, params) {
    return super.patch(id, { deleted_at: new Date() }, params)
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'tag_type'
  }
}
