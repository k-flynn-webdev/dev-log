import { addApiPrefix } from '../helpers/add-api-prefix.js'

export const createAllTagTypeObject = (tagList) => {
  return tagList.reduce((acc, tagType) => {
    if (!acc.hasOwnProperty(tagType.id)) {
      acc[tagType.id] = tagType.value
    }

    return acc
  }, {})
}

/**
 * Will add all known tag types object to params to be used elsewhere
 */
export const addAllTagTypeObject = async (context) => {
  context.params.allTagTypeObject = {}

  const getAllTagTypes = await context.app.service(addApiPrefix(context.app, 'tag-type')).getAllReduced()

  context.params.allTagTypeObject = createAllTagTypeObject(getAllTagTypes)

  return context
}
