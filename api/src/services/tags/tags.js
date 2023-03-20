// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'
import { timeStamp } from '../../hooks/time-stamp.js'
import { setUserIDFromUser } from '../../hooks/set-user-id-from-user.js'
import { limitToUser } from '../../hooks/limit-to-user.js'

import {
  tagDataValidator,
  tagPatchValidator,
  tagQueryValidator,
  tagResolver,
  tagExternalResolver,
  tagDataResolver,
  tagPatchResolver,
  tagQueryResolver
} from './tags.schema.js'
import { TagService, getOptions } from './tags.class.js'

export * from './tags.class.js'
export * from './tags.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tag = (app) => {
  const servicePath = addApiPrefix(app, 'tags')
  // Register our service on the Feathers application
  app.use(servicePath, new TagService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(servicePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tagExternalResolver), schemaHooks.resolveResult(tagResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(tagQueryValidator),
        schemaHooks.resolveQuery(tagQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tagDataValidator),
        schemaHooks.resolveData(tagDataResolver),
        setUserIDFromUser,
      ],
      patch: [
        schemaHooks.validateData(tagPatchValidator),
        schemaHooks.resolveData(tagPatchResolver),
        timeStamp('updated_at')
      ],
      remove: [
        limitToUser
      ]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
