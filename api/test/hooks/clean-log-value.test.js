// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { afterEach, expect, test, describe, vi } from 'vitest'
import { cleanLogValue } from '../../src/hooks/clean-log-value'

const defaultContext = (value) => {
  const res = {
    data: {
      value: value || ''
    },
    params: {}
  }

  return res
}

const hashExamples = ['#ALL-CAPS-123', '#tag', '#numbered-2-tag', '#otherTag']

describe('`cleanLogValue` hook', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('If no `data.value` return context', async () => {
    const context = defaultContext(null)
    const test = cleanLogValue(context)

    expect(test).toEqual(context)
  })

  test('`logClean` should reflect `data.value`', async () => {
    const value = 'no tag'
    const context = defaultContext(value)
    const test = cleanLogValue(context)

    expect(test.params.logClean).toEqual(` ${value} `)
  })

  test('`logClean` should be a cleaned log', async () => {
    const value = 'no tagtag with . and #other tag'
    const correct = 'no tagtag with and other tag'
    const context = defaultContext(value)
    const test = cleanLogValue(context)

    expect(test.params.logClean).toEqual(` ${correct} `)
  })
})
