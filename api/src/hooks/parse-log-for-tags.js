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
    const tagValueCheck = tag.value.startsWith('#') ?
        tag.value.replace('#', '') :
        tag.value

    if (context.params.logClean.includes(tagValueCheck)) acc.push(tag)

    // remove duplicates from custom tags
    context.params.logTagsCustom = context.params.logTagsCustom
      .filter((item) => item !== `#${tagValueCheck}`)

    return acc
  }, [])

  return context
}
