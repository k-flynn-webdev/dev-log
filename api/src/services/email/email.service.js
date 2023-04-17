// Initializes the `email` service on path `/email`
import { Email } from './email.class.js'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

export const email = (app) => {
  const servicePath = addApiPrefix(app, 'email')

  const mailConfig = app.get('mail')

  const options = {
    paginate: app.get('paginate'),
    active: mailConfig.active,
    api: mailConfig.api,
    domain: mailConfig.domain,
    host: mailConfig.host,
    from: mailConfig.from,
    app_url: app.get('APP_URL')
  }

  app.use(servicePath, new Email(options))
}
