import * as React from "react"

const getTagType = tag => tag.type.toLowerCase()
const getTagValue = tag => tag.value.toLowerCase()
const getTagTitle = tag => `${getTagType(tag)} - ${getTagValue(tag)}`

function Tags({ tags }) {
  const tagsList = tags
    ? tags.map(tag => (
        <div key={getTagValue(tag)} className="tag" title={getTagTitle(tag)}>
          {getTagValue(tag)}
        </div>
      ))
    : ""

  return <>{tags.length ? <div className="tags">{tagsList}</div> : ""}</>
}

export default Tags
