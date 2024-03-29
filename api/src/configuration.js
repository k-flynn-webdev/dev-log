import { defaultAppSettings, getValidator } from '@feathersjs/schema'

import { dataValidator } from './validators.js'

export const configurationSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['host', 'port', 'public'],
  properties: {
    ...defaultAppSettings,
    host: { type: 'string' },
    port: { type: 'number' },
    public: { type: 'string' },
    app_url: { type: 'string' },
    mail: { type: 'object' }
  }
}

export const configurationValidator = getValidator(configurationSchema, dataValidator)
