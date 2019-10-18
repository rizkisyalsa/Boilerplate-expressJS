require('dotenv').config()
const http = require('http')

const { logger } = require('./core/logger')
const { registerTerminus } = require('./core/terminus')
const { createApp } = require('./server')
const fakeUserDB = require('./core/database/fakeUsers')

const app = createApp()
const server = http.createServer(app)

registerTerminus(server)
fakeUserDB()

server.listen(process.env.APP_PORT, () => {
  logger.info('Server up...')
  logger.info(`http://localhost:${process.env.APP_PORT}/`)
})