import { KnexService } from '@feathersjs/knex'
import { NotFound } from '@feathersjs/errors'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserService extends KnexService {
  async get(id, params) {
    const result = await super.get(id, params)

    if (result.deleted_at) {
      throw new NotFound('User removed')
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
    name: 'users'
  }
}
