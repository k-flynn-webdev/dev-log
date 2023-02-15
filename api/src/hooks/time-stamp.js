/**
 * Updates a property field with a new Date()
 *
 * @param {string} field    field to set as a date obj
 * @return {function(*): *}
 */
export const timeStamp = (field) => (context) => {
  context.data[field] = new Date()

  return context
}
