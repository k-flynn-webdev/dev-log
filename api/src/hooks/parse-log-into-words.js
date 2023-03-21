const REPLACE_CHARS = ['.', '#', '   ', '  ']

/**
 * Clean Log input into a large cleaned string `context.data.logClean`
 *
 * @return {function(*): *}
 */
export const parseLogIntoWords = (context) => {
  context.params.logClean = []

  if (!context.data.value) return context

  context.params.logClean = ` ${REPLACE_CHARS.reduce((acc, cur) => {
    return acc.replace(cur, ' ')
  }, context.data.value)} `

  return context
}
