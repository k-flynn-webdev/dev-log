// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { parseCustomLogTags } from '../../src/hooks/parse-custom-log-tags.js'

const defaultContext = () => {
  return { data: { value: '' }, params: {} }
}

describe('parseCustomLogTags hook', () => {
  it('should add `logTagsCustom` to context params', () => {
    const context = defaultContext()
    const test = parseCustomLogTags(context)

    assert.ok(test.params.hasOwnProperty('logTagsCustom'))
  })

  it('should return early if ', () => {
    const context = defaultContext()
    const test = parseCustomLogTags(context)

    assert.ok(test.params.hasOwnProperty('logTagsCustom'))
  })
})
