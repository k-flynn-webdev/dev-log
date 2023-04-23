import * as React from "react"

import Tag from "./Tag"

function Tags({ log }) {
  const tags = log.tag

  if (!tags.length) return ""

  return (
    <div className="tags">
      {tags.map(tag => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  )
}

export default Tags
