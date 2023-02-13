import { app } from './app.js'
import { logger } from './logger.js'

const port = app.get('port')
const host = app.get('host')

// debug for services
console.log(Object.keys(app.services))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
