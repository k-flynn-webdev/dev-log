// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, querySyntax, getValidator } from '@feathersjs/schema'
import { passwordHash } from '@feathersjs/authentication-local'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const logSchema = {
  $id: 'Log',
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'number'
    },
    value: { type: 'string' },
    user_id: { type: 'number' },
    created_at: { type: 'string', format: 'date-time', nullable: true },
    updated_at: { type: 'string', format: 'date-time', nullable: true },
    deleted_at: { type: 'string', format: 'date-time', nullable: true },
  }
}
export const logResolver = resolve({})

export const logExternalResolver = resolve({})

// Schema for creating new logs
export const logDataSchema = {
  $id: 'LogData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...logSchema.properties
  }
}
export const logDataValidator = getValidator(logDataSchema, dataValidator)
export const logDataResolver = resolve({})

// Schema for updating existing logs
export const logPatchSchema = {
  $id: 'LogPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...logSchema.properties
  }
}
export const logPatchValidator = getValidator(logPatchSchema, dataValidator)
export const logPatchResolver = resolve({})

// Schema for allowed query properties
export const logQuerySchema = {
  $id: 'LogQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(logSchema.properties)
  }
}
export const logQueryValidator = getValidator(logQuerySchema, queryValidator)
export const logQueryResolver = resolve({
  // If there is a log (e.g. with authentication), they are only allowed to see their own data
  id: async (value, log, context) => {
    if (context.params.log) {
      return context.params.log.user_id
    }

    return value
  }
})
