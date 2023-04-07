import * as React from "react"

const userDetailsToShow = {
  email: { label: "Email", render: user => user.email },
  created_at: {
    label: "Joined",
    render: user => new Date(user.created_at).toLocaleDateString(),
  },
  log_count: { label: "Logs created", render: user => user.log_count },
  tag_count: { label: "Tags created", render: user => user.tag_count },
}

function UserMenuDetails({ userDetails }) {
  return (
    <div className="profile-user-details">
      {Object.keys(userDetailsToShow).map(key => {
        return (
          <div className="profile-user-details__line" key={key}>
            <span className="profile-user-details__line-label">
              {userDetailsToShow[key].label}:{" "}
            </span>
            <span className="profile-user-details__line-detail">
              {userDetailsToShow[key].render(userDetails)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default UserMenuDetails
