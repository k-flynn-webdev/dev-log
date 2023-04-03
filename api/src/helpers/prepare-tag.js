export const prepareTag = (tag, replaceChar) => {
  return tag
    .toLowerCase()
    .trim()
    .replace(replaceChar ? replaceChar : '#', '')
}
