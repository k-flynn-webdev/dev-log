// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import { afterEach, expect, test, describe, vi } from 'vitest'
import { parseLogForTags } from '../../src/hooks/parse-log-for-tags'

const allTags = ['example', 'test', 'python', 'c#', 'c++'].map((item, idx) => {
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
      value: value ? value : ''
    },
    params: {
      logClean: value ? ` ${value} ` : '',
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
    expect(await test.app.service('any').getAll()).toEqual(allTags)
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

  test('should remove duplicate Tags where the occurance is very simialar', async () => {
    const genericTag = { id: 0, value: 'generic' }
    const generic1Tag = { id: 1, value: 'generic1' }
    const tagService = tagsGetAllService([genericTag, generic1Tag])

    const testFunc = async (input) => {
      const logValue = input.value
      const context = defaultContext(logValue, tagService)

      const test = await parseLogForTags(context)

      expect(test.params.logTagsFound.length).toEqual(1)
      expect(test.params.logTagsFound[0]).toEqual(input)
    }

    await testFunc(genericTag)
    await testFunc(generic1Tag)
  })

  test('should check tags with special chars e.g. `c#`', async () => {
    const testTag = allTags.find((item) => item.value === 'c#')
    const tagService = tagsGetAllService([...allTags])

    const logValue = 'testing c# code here'
    const context = defaultContext(logValue, tagService)

    const test = await parseLogForTags(context)

    expect(test.params.logTagsFound.length).toEqual(1)
    expect(test.params.logTagsFound[0]).toEqual(testTag)
  })

  test('should check tags with special chars e.g. `c++`', async () => {
    const testTag = allTags.find((item) => item.value === 'c++')
    const tagService = tagsGetAllService([...allTags])

    const logValue = 'testing c++ code here'
    const context = defaultContext(logValue, tagService)

    const test = await parseLogForTags(context)

    expect(test.params.logTagsFound.length).toEqual(1)
    expect(test.params.logTagsFound[0]).toEqual(testTag)
  })
})
