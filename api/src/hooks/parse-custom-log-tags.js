import { prepareTag } from '../helpers/prepare-tag.js'

/**
 * Find custom hashtags from `context.params.logClean`
 *
 * @return {function(*): *}
 */
export const parseCustomLogTags = (context) => {
  context.params.logTagsCustom = []

  if (!context.data.value || !context.params.logClean) return context
  if (!context.data.value.includes('#')) return context

  const tagsByHash = context.data.value.match(/#[A-Za-z0-9-_]+/g)

  tagsByHash.forEach((tag) => {
    context.params.logTagsCustom.push(prepareTag(tag))
  })

  return context
}
