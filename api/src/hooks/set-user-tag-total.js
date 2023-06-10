// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors'
import { addApiPrefix } from '../helpers/add-api-prefix.js'

/**
 * Adds User `tag` total to `data[0].tag_total`
 *
 * @param {object} context
 * @return {function(*): *}
 */
export const setUserTagTotal = async (context) => {
  const userID = context?.params?.user?.id

  if (!userID) return context

  for (let i = 0, max = context.result.data.length; i < max; i++) {
    context.result.data[i].tag_total = await context.app
      .service(addApiPrefix(context.app, 'tag'))
      .getTotalTagCount(context.result.data[i].id)
  }

  return context
}
