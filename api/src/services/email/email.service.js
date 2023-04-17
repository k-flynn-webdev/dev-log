// Initializes the `email` service on path `/email`
import { Email } from './email.class.js'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

export const email = (app) => {
  const servicePath = addApiPrefix(app, 'email')

  const options = {
    paginate: app.get('paginate'),
    active: app.get('mail').active,
    api: app.get('mail').api,
    domain: app.get('mail').domain,
    host: app.get('mail').host,
    from: app.get('mail').from
  }

  app.use(servicePath, new Email(options))
}
