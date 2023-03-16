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

  async find(params) {

    const res = await super.find(params);
    const logIds = res.data.map((log) => log.id)

    const log_tags = await this.db()
      .from('log_tags')
      .select('*')
      .whereIn('log_tags.log_id', logIds)

    const log_tags_acc = log_tags.reduce((acc, current) => {
      if (!acc[current.log_id]) acc[current.log_id] = []

      acc[current.log_id].push(current.tag_id)
      if (!acc.tag_ids.includes(current.tag_id)) acc.tag_ids.push(current.tag_id)

      return acc
    }, { tag_ids: []})

    const tags_used = await this.db()
      .from('tags')
      .select('*')
      .whereIn('tags.id', log_tags_acc.tag_ids)

    res.tags = tags_used.reduce((acc, current) => {
      if (!acc[current.id]) acc[current.id] = current

      return acc
    }, {})


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
    name: 'logs'
  }
}
