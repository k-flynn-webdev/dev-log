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
    const all_log_ids = res.data.map((log) => log.id)

    const log_to_tag_columns = await this.db()
      .from('log_tags')
      .select('*')
      .whereIn('log_tags.log_id', all_log_ids)

    const all_tag_ids = []
    const all_log_to_tags_acc = []

    log_to_tag_columns.forEach((row) => {
      if (!all_tag_ids.includes(row.tag_id)) all_tag_ids.push(row.tag_id)
      if (!all_log_to_tags_acc[row.log_id]) all_log_to_tags_acc[row.log_id] = []

      all_log_to_tags_acc[row.log_id].push(row.tag_id)
    })

    const tags_for_logs = await this.db()
      .select('created_at', 'value', 'id', 'type' )
      .from('tags')
      .whereIn('tags.id', all_tag_ids)

    res.data.forEach((_item, idx) => {
      res.data[idx].tags = []

      if (all_log_to_tags_acc[res.data[idx].id]) {
        res.data[idx].tags = all_log_to_tags_acc[res.data[idx].id]
        .map((tagId) => tags_for_logs.find((tag) => tag.id === tagId))
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
    name: 'logs'
  }
}
