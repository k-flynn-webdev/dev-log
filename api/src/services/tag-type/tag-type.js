// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { addApiPrefix } from '../../helpers/add-api-prefix.js'
import { timeStamp } from '../../hooks/time-stamp.js'
import { setUserIDFromUser } from '../../hooks/set-user-id-from-user.js'
import { limitToUser } from '../../hooks/limit-to-user.js'

import {
  tagTypeDataValidator,
  tagTypePatchValidator,
  tagTypeQueryValidator,
  tagTypeResolver,
  tagTypeExternalResolver,
  tagTypeDataResolver,
  tagTypePatchResolver,
  tagTypeQueryResolver
} from './tag-type.schema.js'
import { TagTypeService, getOptions } from './tag-type.class.js'

export * from './tag-type.class.js'
export * from './tag-type.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tagType = (app) => {
  const servicePath = addApiPrefix(app, 'tag-type')
  // Register our service on the Feathers application
  app.use(servicePath, new TagTypeService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(servicePath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tagTypeExternalResolver), schemaHooks.resolveResult(tagTypeResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [authenticate('jwt')],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(tagTypeQueryValidator), schemaHooks.resolveQuery(tagTypeQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tagTypeDataValidator),
        schemaHooks.resolveData(tagTypeDataResolver),
        setUserIDFromUser
      ],
      patch: [
        schemaHooks.validateData(tagTypePatchValidator),
        schemaHooks.resolveData(tagTypePatchResolver),
        timeStamp('updated_at')
      ],
      remove: [limitToUser]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
