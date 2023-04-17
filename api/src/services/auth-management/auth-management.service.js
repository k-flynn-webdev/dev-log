import { AuthenticationManagementService } from 'feathers-authentication-management'
import { authenticate } from '@feathersjs/authentication'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

import { addVerification, removeVerification } from 'feathers-authentication-management'
import { iff } from 'feathers-hooks-common'
import { logger } from '../../logger.js'
import { notifier } from './notifier.js'

const isAction =
  (...args) =>
  (hook) =>
    args.includes(hook.data.action)

// todo
export const sendVerify = () => {
  return async (context) => {
    const authNotifier = notifier(context.app)

    const users = Array.isArray(context.result) ? context.result : [context.result]

    await Promise.all(users.map(async (user) => authNotifier('resendVerifySignup', user)))
  }
}

export const sequelizeConvertAlm = (context) => {
  // converts = converts || {
  //   isInvitation: 'boolean',
  //   isVerified: 'boolean',
  //   verifyExpires: 'date',
  //   verifyChanges: 'json',
  //   resetExpires: 'date',
  //   mfaExpires: 'date',
  //   passwordHistory: 'json'
  // }

  // return sequelizeConvert(converts, ignores, conversions)

  if (context.data) {
    // bugfix for random properties added???
    const keys = Object.keys(context.data)
    if (keys.includes('0')) delete context.data['0']
    if (keys.includes('1')) delete context.data['1']
  }

  if (context?.data?.verifyChanges) {
    if (context.type === 'before') {
      context.data.verifyChanges = JSON.stringify(context.data.verifyChanges)
    }
    if (context.type === 'after') {
      try {
        context.data.verifyChanges = JSON.parse(context.data.verifyChanges)
        context.data.resetExpires = new Date(context.data.resetExpires).valueOf() || null
      } catch (e) {
        logger.error('error converting', context.data)
      }
    }
  }

  return context
}

export const userAuthModelFields = {
  isVerified: { type: 'boolean', nullable: false },
  verifyToken: { type: 'string', nullable: true },
  verifyExpires: { type: 'string', format: 'date-time', nullable: true },
  verifyShortToken: { type: 'string', nullable: true },
  verifyChanges: { type: 'string', nullable: true },
  resetToken: { type: 'string', nullable: true },
  resetShortToken: { type: 'string', nullable: true },
  resetExpires: { type: 'number', nullable: true },
  resetAttempts: { type: 'number', nullable: true }
}

export const authManagement = (app) => {
  const servicePath = addApiPrefix(app, 'auth-management')
  const userServicePath = addApiPrefix(app, 'users')

  app.use(
    servicePath,
    new AuthenticationManagementService(app, {
      service: userServicePath,
      notifier: notifier(app)
    })
  )

  app.service(servicePath).hooks({
    before: {
      create: [
        // The user must be signed in before being allowed to change their password or communication values.
        iff(isAction('passwordChange', 'identityChange'), authenticate('jwt'))
      ]
    }
  })

  // Initialize hooks
  app.service(userServicePath).hooks({
    before: {
      all: [sequelizeConvertAlm],
      create: [
        addVerification(servicePath) // adds .isVerified, .verifyExpires, .verifyToken, .verifyChanges
      ]
    },
    after: {
      all: [sequelizeConvertAlm],
      create: [
        sendVerify(),
        removeVerification() // removes verification/reset fields other than .isVerified from the response
      ]
    }
  })
}
