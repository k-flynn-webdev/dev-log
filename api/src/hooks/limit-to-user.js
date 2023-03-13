// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';

/**
 * Adds User.Id as `data[user_id]`
 *
 * @param {object} context
 * @return {function(*): *}
 */
export const limitToUser = (context) => {
const hasUserID = context?.params?.user?.id && context?.params?.user?.id > 0
const hasUserIDQuery = context?.params?.user_id && context?.params?.user_id > 0

  if (hasUserID && hasUserIDQuery) {
    if (context.params.user.id !== context.params.query.user_id) {
      throw new BadRequest('User and Query do not match.')
    }
  }

  context.params.query.user_id = context.params.user.id

  return context
}
