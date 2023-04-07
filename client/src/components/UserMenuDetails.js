import * as React from "react"

function UserMenuDetails({ userDetails }) {
  return (
    <>
      <div>
        <span>Email: </span>
        <span>{userDetails.email}</span>
      </div>
      <div>
        <span>Joined: </span>
        <span>{new Date(userDetails.created_at).toLocaleDateString()}</span>
      </div>
      <div>
        <span>Updated: </span>
        <span>{new Date(userDetails.updated_at).toLocaleDateString()}</span>
      </div>
      <div>
        <span>Logs created: </span>
        <span>{userDetails.log_count}</span>
      </div>
      <div>
        <span>Tags created: </span>
        <span>{userDetails.tag_count}</span>
      </div>
    </>
  )
}

export default UserMenuDetails
