import { addApiPrefix } from '../helpers/add-api-prefix.js'

/**
 * Update a User `last_login` after a successful login
 */
export const lastLogin = (context) => {
  const userId = context.result.user.id || null
  if (!userId) return context

  context.app
    .service(addApiPrefix(context.app, 'users'))
    ._patch(userId, { last_login: new Date() }, context.params)

  return context
}
