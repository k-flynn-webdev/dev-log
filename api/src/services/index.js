import { user } from './users/users.js'
import { log } from './logs/logs.js'

export const services = (app) => {
  app.configure(user)
  app.configure(log)

  // All services will be registered here
}
