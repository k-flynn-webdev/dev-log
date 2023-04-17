import { logger } from '../../logger.js'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

export const notifier = (app) => {
  const servicePath = addApiPrefix(app, 'email')

  function getLink(type, hash) {
    const url = app.get('app_url') || app.get('host')

    return `${url}/${type}?token=${hash}`
  }

  async function sendEmail(emailContent) {
    try {
      const result = await app.service(servicePath).create(emailContent)
      return result
    } catch (err) {
      logger.error(err)
    }
  }

  return (type, user, notifierOptions = {}) => {
    if (type === 'resendVerifySignup') {
      return sendEmail({
        to: user.email,
        subject: 'Please confirm your e-mail address',
        text: 'Click here: ' + getLink('login/verify', user.verifyToken)
      })
    } else if (type === 'verifySignup') {
      return sendEmail({
        to: user.email,
        subject: 'E-Mail address verified',
        text: 'Registration process complete. Thanks for joining us!'
      })
    }
  }
}
