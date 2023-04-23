import { addApiPrefix } from '../helpers/add-api-prefix.js'

export const createAllTagTypeObject = (tagList) => {
  return tagList.reduce((acc, tagType) => {
    if (!acc.hasOwnProperty(tagType.id)) {
      acc[tagType.id] = tagType.value
    }

    return acc
  }, {})
}

export const addTagTypeToTags = (log, allTagObject) => {
  log.tag.forEach((tag) => {
    tag.type = allTagObject[tag.type_id]
  })
}

/**
 * Add related tag type from tag used in `data.log.tag[]` in `After Context`
 */
export const getRelatedTagType = async (context) => {
  if (context.result && context.result.data && context.result.data.length) {
    const getAllTagTypes = await context.app.service(addApiPrefix(context.app, 'tag-type')).getAllReduced()

    const allTagObject = createAllTagTypeObject(getAllTagTypes)

    context.result.data.forEach((log) => {
      addTagTypeToTags(log, allTagObject)
    })
  }

  return context
}
