import { logger } from '../../logger.js'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

export const notifier = (app) => {
  const servicePath = addApiPrefix(app, 'email')

  function createTokenLink(type, hash) {
    const url = app.get('app_url') || app.get('host')

    return `${url}/login/${type}?token=${hash}`
  }

  async function sendEmail(emailContent) {
    try {
      const result = await app.service(servicePath).create(emailContent)
      return result
    } catch (err) {
      logger.error(err)
    }
  }

  return async function (type, user, notifierOptions) {
    switch (type) {
      case 'resendVerifySignup':
        return await sendEmail({
          to: user.email,
          subject: 'Verify Signup',
          html: createTokenLink('verify', user.verifyToken)
        })
      case 'verifySignup':
        return await sendEmail({
          to: user.email,
          subject: 'Confirm Signup',
          html: createTokenLink('verify', user.verifyToken)
        })
      case 'sendResetPwd':
        return await sendEmail({
          to: user.email,
          subject: 'Send Reset Password',
          html: createTokenLink('reset', user.verifyToken)
        })
      case 'resetPwd':
        return await sendEmail({
          to: user.email,
          subject: 'Reset Password',
          html: createTokenLink('reset', user.verifyToken)
        })
      case 'passwordChange':
        break
      case 'identityChange':
        return await sendEmail({
          to: user.email,
          subject: 'Change your identity',
          html: createTokenLink('verifyChanges', user.verifyToken)
        })
    }
  }
}
