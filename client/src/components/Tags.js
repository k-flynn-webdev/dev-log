import * as React from "react"

import Tag from "./Tag"

function Tags({ tags }) {
  return (
    <>
      {tags.length ? (
        <div className="tags">
          {tags.map(tag => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Tags
