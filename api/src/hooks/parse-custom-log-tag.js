import { prepareTag } from '../helpers/prepare-tag.js'

/**
 * Find custom hashtag from `context.params.logClean`
 *
 * @return {function(*): *}
 */
export const parseCustomLogTag = (context) => {
  context.params.logTagCustom = []

  if (!context.data.value || !context.params.logClean) return context
  if (!context.data.value.includes('#')) return context

  const tagByHash = context.data.value.match(/#[A-Za-z0-9-_]+/g)

  if (tagByHash) {
    tagByHash.forEach((tag) => {
      context.params.logTagCustom.push(prepareTag(tag))
    })
  }

  return context
}
