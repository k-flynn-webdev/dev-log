// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { afterEach, expect, test, describe, vi } from 'vitest'
import { parseLogForTags } from '../../src/hooks/parse-log-for-tags'

const allTags = ['example', 'test', 'python', 'c#'].map((item, idx) => {
  return { id: idx, value: item }
})

const tagsGetAllService = (value) => {
  return {
    getAll: vi.fn(() => {
      return new Promise((res) => {
        setTimeout(() => {
          res(value)
        }, 10)
      })
    })
  }
}

const defaultContext = (value, tagService) => {
  const res = {
    data: {
      value: value || ''
    },
    params: {
      logClean: value || '',
      logTagsCustom: []
    },
    app: {
      service: () => tagService
    }
  }

  return res
}

const hashExamples = ['#ALL-CAPS-123', '#tag', '#numbered-2-tag', '#otherTag']

describe('`parseLogForTags` hook', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should exit early with no `logClean`', async () => {
    const tagService = tagsGetAllService(allTags)
    const context = defaultContext(null, tagService)
    const test = await parseLogForTags(context)

    expect(test.app.service('any').getAll).toBeCalledTimes(0)
  })

  test('should call `getAll` tags when `cleanLog` exists', async () => {
    const tagService = tagsGetAllService(allTags)
    const context = defaultContext('example log', tagService)
    const test = await parseLogForTags(context)

    expect(test.app.service('any').getAll).toBeCalledTimes(1)
  })

  test('should match `getAll` tags with occurances in `cleanLog`', async () => {
    const tagService = tagsGetAllService(allTags)
    const logValue = allTags.map((item) => item.value).join(' ')
    const context = defaultContext(logValue, tagService)

    const test = await parseLogForTags(context)

    expect(test.params.logTagsFound.length).toEqual(allTags.length)

    allTags.forEach((testTag) => {
      const foundTag = test.params.logTagsFound.find((item) => item.value === testTag.value)
      expect(foundTag).toBe(testTag)
    })
  })

  test('should remove duplicate customTags', async () => {
    const genericTag = { id: 0, value: 'generic' }
    const tagService = tagsGetAllService([genericTag])

    // const logValue = allTags.map((item) => item.value).join(' ')
    // const context = defaultContext(logValue, tagService)

    // const test = await parseLogForTags(context)

    // expect(test.params.logTagsFound.length).toEqual(allTags.length)

    // allTags.forEach((testTag) => {
    //   const foundTag = test.params.logTagsFound.find((item) => item.value === testTag.value)
    //   expect(foundTag).toBe(testTag)
    // })
  })

  // test('should return empty `logTagsCustom`', () => {
  //   const context = defaultContext('no hash value')

  //   const test = parseCustomLogTags(context)

  //   expect(test.params.logTagsCustom).toEqual([])
  // })

  // test('should return with `logTagsCustom` array', () => {
  //   const context = defaultContext('has #hash value')

  //   const test = parseCustomLogTags(context)

  //   expect(test.params.logTagsCustom).toEqual(['hash'])
  // })

  // test('should always return lowercase tags', () => {
  //   const context = defaultContext(hashExamples[0].toUpperCase())

  //   const test = parseCustomLogTags(context)

  //   expect(test.params.logTagsCustom).toEqual([hashExamples[0].toLowerCase().trim().replace('#', '')])
  // })

  // test('should always return tags without hash character', () => {
  //   const context = defaultContext(hashExamples.join(', '))

  //   const test = parseCustomLogTags(context)

  //   expect(test.params.logTagsCustom).toEqual(
  //     hashExamples.map((item) => item.toLowerCase().trim().replace('#', ''))
  //   )
  // })
})
