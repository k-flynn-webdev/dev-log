import { AuthenticationManagementService } from 'feathers-authentication-management'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'

import { addVerification, removeVerification } from 'feathers-authentication-management'
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

export const userAuthModelFields = {
  isVerified: { type: 'boolean', nullable: false },
  verifyToken: { type: 'string', nullable: true },
  verifyExpires: { type: 'string', format: 'date-time', nullable: true }
}

export const notifier = () => {}

export const authManagement = (app) => {
  const servicePath = addApiPrefix(app, 'auth-management')
  const userServicePath = addApiPrefix(app, 'users')

  app.use(
    servicePath,
    new AuthenticationManagementService(app, {
      notifier: notifier(app)
    })
  )

  // Initialize hooks
  app.service(userServicePath).hooks({
    before: {
      create: [addVerification(servicePath)]
    },
    after: {
      create: [removeVerification()]
    }
  })
}
