import 'dotenv/config'
import 'reflect-metadata'

import type { DataSource } from 'typeorm'

import express from 'express'
import cors from 'cors'

import { AppDataSource } from './data-source/data-source'
import { AppealsRouter } from './appeals/appeals.router'

AppDataSource.initialize()
  .then(dataSource => {
    runServer(dataSource)
  })
  .catch(err => {
    console.log(err)
  })

function runServer(dataSource: DataSource) {
  const app = express()

  const appealsRouter = new AppealsRouter(dataSource).init()

  app.use(express.json())
  app.use(cors())

  app.use('/appeals', appealsRouter)

  app.listen(4000)
}
