import { addApiPrefix } from '../helpers/add-api-prefix.js'

/**
 * Create custom tags found from the log value
 *
 * @return {function(*): *}
 */
export const createCustomTags = async (context) => {
  if (!context.params.logTagsCustom) return context

  const tagsToCreate = context.params.logTagsCustom.reduce((acc, cur) => {
    acc.push({
      value: cur.trim(),
      type: 'custom',
      user_id: context.params.user.id
    })

    return acc
  }, [])

  const newTagsCreated = await context.app
    .service(addApiPrefix(context.app, 'tags'))
    ._create(tagsToCreate, context.params)

  newTagsCreated.forEach((tag) => context.params.logTagsFound.push(tag))

  return context
}
