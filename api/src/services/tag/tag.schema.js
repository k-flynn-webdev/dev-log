// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, querySyntax, getValidator } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const tagSchema = {
  $id: 'Tag',
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'number'
    },
    value: { type: 'string' },
    type_id: { type: 'number' },
    user_id: { type: 'number' },

    created_at: { type: 'string', format: 'date-time', nullable: true },
    updated_at: { type: 'string', format: 'date-time', nullable: true },
    deleted_at: { type: 'string', format: 'date-time', nullable: true }
  }
}
export const tagResolver = resolve({})

export const tagExternalResolver = resolve({})

// Schema for creating new tag
export const tagDataSchema = {
  $id: 'TagData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...tagSchema.properties
  }
}
export const tagDataValidator = getValidator(tagDataSchema, dataValidator)
export const tagDataResolver = resolve({})

// Schema for updating existing tag
export const tagPatchSchema = {
  $id: 'TagPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...tagSchema.properties
  }
}
export const tagPatchValidator = getValidator(tagPatchSchema, dataValidator)
export const tagPatchResolver = resolve({})

// Schema for allowed query properties
export const tagQuerySchema = {
  $id: 'TagQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(tagSchema.properties)
  }
}
export const tagQueryValidator = getValidator(tagQuerySchema, queryValidator)
export const tagQueryResolver = resolve({})
