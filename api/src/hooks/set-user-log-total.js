// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors'
import { addApiPrefix } from '../helpers/add-api-prefix.js'

/**
 * Adds User `log` total to `data[0].log_total`
 *
 * @param {object} context
 * @return {function(*): *}
 */
export const setUserLogTotal = async (context) => {
  const userID = context?.params?.user?.id

  if (!userID) return context

  for (let i = 0, max = context.result.data.length; i < max; i++) {
    context.result.data[i].log_total = await context.app
      .service(addApiPrefix(context.app, 'log'))
      .getTotalLogCount(context.result.data[i].id)
  }

  return context
}
