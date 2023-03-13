// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest } from '@feathersjs/errors';

/**
 * Adds User.Id as `data[user_id]`
 *
 * @param {object} context
 * @return {function(*): *}
 */
export const setUserIDFromUser = (context) => {
  if (!context.params.user) {
    throw new BadRequest('User Id missing', {})
  }

  if (!context.data) { context.data = {} }

  context.data.user_id = context.params.user.id

  return context
}
