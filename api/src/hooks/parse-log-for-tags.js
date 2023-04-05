import { addApiPrefix } from '../helpers/add-api-prefix.js'
import { prepareTag } from '../helpers/prepare-tag.js'

/**
 * Compares clean log input against all known tags
 *
 * @return {function(*): *}
 */
export const parseLogForTags = async (context) => {
  if (!context.params.logClean) return context

  const allTags = await context.app.service(addApiPrefix(context.app, 'tags')).getAll()

  context.params.logTagsFound = allTags.reduce((acc, tag) => {
    if (!tag) return acc

    const tagValueCheck = tag.value.startsWith('#') ? prepareTag(tag.value) : prepareTag(tag.value, '  ')

    if (new RegExp(`\\b${tagValueCheck}\\s`).test(`${context.params.logClean.toLowerCase()} `)) acc.push(tag)

    // remove duplicates from custom tags
    context.params.logTagsCustom = context.params.logTagsCustom.filter((item) => item !== tagValueCheck)

    return acc
  }, [])

  return context
}
