/**
 * Split by hashtags from `context.params.logClean`
 *
 * @return {function(*): *}
 */
export const parseCustomLogTags = (context) => {
  context.params.logTagsCustom = []

  if (!context.data.value || !context.params.logClean) return context
  if (!context.params.logClean.includes('#')) return context

  const tagsByHash = context.params.logClean.match(/#[a-z0-9_]+/g)

  tagsByHash.forEach((tag) => {
    context.params.logTagsCustom.push(tag.trim())
  })

  return context
}
