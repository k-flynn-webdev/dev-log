import { addApiPrefix } from '../helpers/add-api-prefix.js'

export const getAllRelatedTagIdsFromLogs = async (context, logs) => {
  const logIds = logs.map((item) => item.id)

  return await context.app.service(addApiPrefix(context.app, 'log')).getLogToTagRows(logIds)
}

export const createAllTagIdObject = (tags) => {
  return tags.reduce((acc, cur) => {
    if (!acc[cur.id]) acc[cur.id] = cur
    return acc
  }, {})
}

export const createLogIdToTagIdObject = (logs) => {
  return logs.reduce((acc, cur) => {
    const logId = cur.log_id
    const tagId = cur.tag_id

    if (!acc[logId]) acc[logId] = { id: logId, tag: [] }
    if (!acc[logId].tag.includes(tagId)) acc[logId].tag.push(tagId)

    return acc
  }, {})
}

export const resolveLogTags = (logs, logIdToTagIdObject, allTagObject) => {
  return logs.map((log) => {
    const tagsRelated = logIdToTagIdObject[log.id].tag.reduce((acc, tagId) => {
      if (allTagObject[tagId]) acc.push(allTagObject[tagId])
      return acc
    }, [])

    return {
      ...log,
      tag: tagsRelated
    }
  })
}

/**
 * Hydrate tags for logs of returned data
 */
export const hydrateLogTags = async (context) => {
  if (context.result.data && context.result.data.length) {
    const logTagRowIds = await getAllRelatedTagIdsFromLogs(context, context.result.data)
    const allRelatedTagIds = logTagRowIds.map((item) => item.tag_id)
    const logIdToTagIdObject = createLogIdToTagIdObject(logTagRowIds)

    const allRelatedTagItems = await context.app
      .service(addApiPrefix(context.app, 'tag'))
      .find({ paginate: false, getReduced: true, query: { id: { $in: allRelatedTagIds }, deleted_at: null } })

    const allTagObject = createAllTagIdObject(allRelatedTagItems)

    context.result.data = resolveLogTags(context.result.data, logIdToTagIdObject, allTagObject)
  }

  return context
}
