const REPLACE_CHARS = ['.', '   ', '  ']


/**
 * Clean Log input into a large cleaned string `context.data.logClean`
 *
 * @return {function(*): *}
 */
export const createNewTags = (context) => {
  context.params.newTags = []

  if (!context.data.value) return context

  const logCleaned = ` ${REPLACE_CHARS.reduce((acc, cur) => {
    return acc.replace(cur, ' ')
  }, context.data.value)} `

  const newTags = logCleaned.split('#')
  if (newTags[0].includes('#'))

    // TODO fix this logic to be beter at cleaning up the splits by hashtag

  console.log(newTags)

  newTags.forEach((tagLine) => {
    context.params.newTags.push(tagLine.split(' ')[0].trim())
  })

  console.log(context.params.newTags)

  return context
}
