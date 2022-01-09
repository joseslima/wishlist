import express from 'express'

import { createConnection } from 'typeorm'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger/openapi.json'

export class App {
  private port: number | string

  constructor() {
    this.port = process.env.PORT || 80
  }

  public async start() {
    await createConnection()

    const app = express()

    const { AppRouter } = await import('./routes')

    app.set('env', process.env.APP_ENV)

    app.use(AppRouter)

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    app.listen(this.port, () => {
      console.log('App is listening on port ', this.port)
    })
  }
}
