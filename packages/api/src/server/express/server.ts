import http from 'http'

import express from 'express'

export const expressApp = express()
export const httpServer = http.createServer(expressApp)
export const expressRouter = express.Router()
