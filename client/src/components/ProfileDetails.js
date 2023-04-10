import * as React from "react"

const profileDetailsToShow = {
  email: { label: "Email", render: profile => profile.email },
  created_at: {
    label: "Joined",
    render: profile => new Date(profile.created_at).toLocaleDateString(),
  },
  log_count: { label: "Logs created", render: profile => profile.log_count },
  tag_count: { label: "Tags created", render: profile => profile.tag_count },
}

function ProfileDetails({ profileDetails }) {
  return (
    <div className="profile-details">
      {Object.keys(profileDetailsToShow).map(key => {
        return (
          <div className="profile-details__line" key={key}>
            <span className="profile-details__line-label">
              {profileDetailsToShow[key].label}:{" "}
            </span>
            <span className="profile-details__line-detail">
              {profileDetailsToShow[key].render(profileDetails)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default ProfileDetails
