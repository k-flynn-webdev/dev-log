// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'
import { timeStamp } from '../../hooks/time-stamp.js'
import { setUserIDFromUser } from '../../hooks/set-user-id-from-user.js'
import { limitToUser } from '../../hooks/limit-to-user.js'
import { cleanLogValue } from '../../hooks/clean-log-value.js';
import { parseCustomLogTags } from '../../hooks/parse-custom-log-tags.js';
import { parseLogForTags } from '../../hooks/parse-log-for-tags.js';

import {
  logDataValidator,
  logPatchValidator,
  logQueryValidator,
  logResolver,
  logExternalResolver,
  logDataResolver,
  logPatchResolver,
  logQueryResolver
} from './logs.schema.js'
import { LogService, getOptions } from './logs.class.js'

export * from './logs.class.js'
export * from './logs.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const log = (app) => {
  const servicePath = addApiPrefix(app, 'logs')
  // Register our service on the Feathers application
  app.use(servicePath, new LogService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(servicePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(logExternalResolver), schemaHooks.resolveResult(logResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(logQueryValidator),
        schemaHooks.resolveQuery(logQueryResolver),
        limitToUser,
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(logDataValidator),
        schemaHooks.resolveData(logDataResolver),
        setUserIDFromUser,
        cleanLogValue,
        parseCustomLogTags,
        parseLogForTags,
      ],
      patch: [
        schemaHooks.validateData(logPatchValidator),
        schemaHooks.resolveData(logPatchResolver),
        timeStamp('updated_at')
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
