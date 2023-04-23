// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, querySyntax, getValidator } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const tagTypeSchema = {
  $id: 'TagType',
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
    deleted_at: { type: 'string', format: 'date-time', nullable: true }
  }
}
export const tagTypeResolver = resolve({})

export const tagTypeExternalResolver = resolve({})

// Schema for creating new tagTypes
export const tagTypeDataSchema = {
  $id: 'TagTypeData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...tagTypeSchema.properties
  }
}
export const tagTypeDataValidator = getValidator(tagTypeDataSchema, dataValidator)
export const tagTypeDataResolver = resolve({})

// Schema for updating existing tag types
export const tagTypePatchSchema = {
  $id: 'TagTypePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...tagTypeSchema.properties
  }
}
export const tagTypePatchValidator = getValidator(tagTypePatchSchema, dataValidator)
export const tagTypePatchResolver = resolve({})

// Schema for allowed query properties
export const tagTypeQuerySchema = {
  $id: 'TagTypeQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(tagTypeSchema.properties)
  }
}
export const tagTypeQueryValidator = getValidator(tagTypeQuerySchema, queryValidator)
export const tagTypeQueryResolver = resolve({})
