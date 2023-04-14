import { AuthenticationManagementService } from 'feathers-authentication-management'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

import { addVerification, removeVerification } from 'feathers-authentication-management'
import { sequelizeConvert, getItems, replaceItems } from 'feathers-hooks-common'

// todo
// const sendVerify = () => {
//   return (context) => {
//     const notifier = authNotifier(context.app);

//     const users = Array.isArray(context.result)
//       ? context.result
//       : [context.result];

//     await Promise.all(
//       users.map(async user => notifier("resendVerifySignup", user))
//     )
//   };
// }

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

  if (context?.data?.verifyChanges) {
    // if (context.type === 'before') {
    //   context.data.verifyChanges = JSON.parse(context.data.verifyChanges)
    //   return context
    // } else {
    context.data.verifyChanges = JSON.stringify(context.data.verifyChanges)
    // console.log(context.data.verifyChanges)
    // return context
    // }
  }
}

export const userAuthModelFields = {
  isVerified: { type: 'boolean', nullable: false },
  verifyToken: { type: 'string', nullable: true },
  verifyExpires: { type: 'string', format: 'date-time', nullable: true },
  verifyShortToken: { type: 'string', nullable: true },
  verifyChanges: { type: 'string', nullable: true },
  resetToken: { type: 'string', nullable: true },
  resetShortToken: { type: 'string', nullable: true },
  resetExpires: { type: 'string', format: 'date-time', nullable: true },
  resetAttempts: { type: 'number', nullable: true }
}

export const notifier = () => {}

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

  // Initialize hooks
  app.service(userServicePath).hooks({
    before: {
      all: [sequelizeConvertAlm],
      create: [addVerification(servicePath)]
    },
    after: {
      all: [sequelizeConvertAlm],
      create: [removeVerification()]
    }
  })
}

// 1232342re243edf1232342re243edf
