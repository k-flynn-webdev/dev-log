export const addTagTypeToTags = (log, allTagObject) => {
  if (!log || !log.tag || !log.tag.length) return

  log.tag.forEach((tag) => {
    tag.type = allTagObject[tag.type_id]
  })
}

/**
 * Resolve tag type [String] using tag type id [Number]
 */
export const resolveTagType = async (context) => {
  if (!context?.params?.allTagTypeObject) return context

  if (context.result && context.result.data && context.result.data.length) {
    // get/find
    context.result.data.forEach((log) => {
      addTagTypeToTags(log, context.params.allTagTypeObject)
    })
  }

  // create/patch
  if (context.params && context.params.logTagFound && context.params.logTagFound.length) {
    context.params.logTagFound.forEach((tag) => {
      tag.type = context.params.allTagTypeObject[tag.type_id]
    })
  }

  return context
}
