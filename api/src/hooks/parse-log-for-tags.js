import { addApiPrefix } from '../helpers/add-api-prefix.js'

/**
 * Compares clean log input against all known tags
 *
 * @return {function(*): *}
 */
export const parseLogForTags = async (context) => {
  if (!context.params.logClean) return context

  const allTags = await context.app.service(addApiPrefix(context.app, 'tags')).getAll()

  context.params.logTagsFound = allTags.reduce((acc, tag) => {
    if (context.params.logClean.includes(tag.value)) acc.push(tag)

    return acc
  }, [])

  return context
}
