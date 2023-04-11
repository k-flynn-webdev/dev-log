import * as React from "react"

const getTagType = tag => tag.type.toLowerCase()
const getTagValue = tag => tag.value.toLowerCase()
const getTagTitle = tag => `${getTagType(tag)} - ${getTagValue(tag)}`

function Tag({ tag }) {
  return (
    <div key={getTagValue(tag)} className="tag" title={getTagTitle(tag)}>
      {getTagValue(tag)}
    </div>
  )
}

export default Tag
