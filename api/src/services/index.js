import { user } from './users/users.js'
import { log } from './logs/logs.js'
import { tag } from './tag/tag.js'
import { tagType } from './tag-type/tag-type.js'
import { email } from './email/email.service.js'

export const services = (app) => {
  app.configure(user)
  app.configure(email)
  app.configure(log)
  app.configure(tagType)
  app.configure(tag)

  // All services will be registered here
}
