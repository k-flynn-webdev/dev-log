// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { afterEach, expect, test, describe, vi } from 'vitest'
import { parseCustomLogTags } from '../../src/hooks/parse-custom-log-tags.js'

const defaultContext = (value) => {
  const res = {
    data: {
      value: value || ''
    },
    params: {
      logClean: value || ''
    }
  }

  return res
}

const hashExamples = ['#ALL-CAPS-123', '#tag', '#numbered-2-tag', '#otherTag']

describe('`parseCustomLogTags` hook', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should add `logTagsCustom` to context params', () => {
    const context = defaultContext()
    const test = parseCustomLogTags(context)

    expect(test.params.hasOwnProperty('logTagsCustom')).toBe(true)
  })

  test('should return empty `logTagsCustom`', () => {
    const context = defaultContext('no hash value')

    const test = parseCustomLogTags(context)

    expect(test.params.logTagsCustom).toEqual([])
  })

  test('should return with `logTagsCustom` array', () => {
    const context = defaultContext('has #hash value')

    const test = parseCustomLogTags(context)

    expect(test.params.logTagsCustom).toEqual(['hash'])
  })

  test('should always return lowercase tags', () => {
    const context = defaultContext(hashExamples[0].toUpperCase())

    const test = parseCustomLogTags(context)

    expect(test.params.logTagsCustom).toEqual([hashExamples[0].toLowerCase().trim().replace('#', '')])
  })

  test('should always return tags without hash character', () => {
    const context = defaultContext(hashExamples.join(', '))

    const test = parseCustomLogTags(context)

    expect(test.params.logTagsCustom).toEqual(
      hashExamples.map((item) => item.toLowerCase().trim().replace('#', ''))
    )
  })
})
