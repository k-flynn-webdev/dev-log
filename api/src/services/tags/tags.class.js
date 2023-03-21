import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'
import { REDUCED_TAGS_ALIAS } from '../../constants/global';

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TagService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('Tag removed')
    }

    return result
  }

  async getAll() {
    return this.db()
        .select(...REDUCED_TAGS_ALIAS)
        .whereNull('tag.deleted_at' )
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
