import { user } from './users/users.js'
import { log } from './logs/logs.js'
import { tag } from './tags/tags.js'

export const services = (app) => {
  app.configure(user)
  app.configure(log)
  app.configure(tag)

  // All services will be registered here
}
