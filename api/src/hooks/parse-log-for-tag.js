import { addApiPrefix } from '../helpers/add-api-prefix.js'
import { prepareTag } from '../helpers/prepare-tag.js'

/**
 * Compares clean log input against all known tags
 *
 * @return {function(*): *}
 */
export const parseLogForTag = async (context) => {
  if (!context.params.logClean) return context

  const allTags = await context.app
    .service(addApiPrefix(context.app, 'tag'))
    .find({ paginate: false, getReduced: true })

  context.params.logTagFound = allTags.reduce((acc, tag) => {
    if (!tag) return acc

    const tagValueCheck = tag.value.startsWith('#') ? prepareTag(tag.value) : prepareTag(tag.value, '  ')

    if (context.params.logClean.indexOf(tagValueCheck) >= 0) acc.push(tag)

    // remove duplicates from custom tag
    context.params.logTagCustom = context.params.logTagCustom.filter((item) => item !== tagValueCheck)

    return acc
  }, [])

  return context
}
