// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'
import { timeStamp } from '../../hooks/time-stamp.js'
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common'
import { setUserLogTotal } from '../../hooks/set-user-log-total.js'
import { setUserTagTotal } from '../../hooks/set-user-tag-total.js'

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema.js'
import { UserService, getOptions } from './users.class.js'

export * from './users.class.js'
export * from './users.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app) => {
  const servicePath = addApiPrefix(app, 'users')
  // Register our service on the Feathers application
  app.use(servicePath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(servicePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
        timeStamp('created_at')
      ],
      update: [disallow('external')],
      patch: [
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver),
        timeStamp('updated_at'),
        iff(
          isProvider('external'),
          preventChanges(
            true,
            'email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires'
          )
        )
      ],
      remove: []
    },
    after: {
      all: [],
      find: [setUserLogTotal, setUserTagTotal]
    },
    error: {
      all: []
    }
  })
}
