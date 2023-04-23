import { addApiPrefix } from '../helpers/add-api-prefix.js'
import { ENUM_CUSTOM_ID } from '../../seeds/2_addTag.js'

/**
 * Create custom tag found from the log value
 *
 * @return {function(*): *}
 */
export const createCustomTag = async (context) => {
  if (!context.params.logTagCustom) return context

  const tagToCreate = context.params.logTagCustom.reduce((acc, cur) => {
    acc.push({
      value: cur.trim(),
      type_id: ENUM_CUSTOM_ID,
      user_id: context.params.user.id
    })

    return acc
  }, [])

  const newTagCreated = await context.app
    .service(addApiPrefix(context.app, 'tag'))
    ._create(tagToCreate, context.params)

  newTagCreated.forEach((tag) => context.params.logTagFound.push(tag))

  return context
}
