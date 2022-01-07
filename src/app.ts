import express from 'express'

import { createConnection } from 'typeorm'

export class App {
  private port: number | string

  constructor() {
    this.port =  process.env.PORT || 80
  }

  public async start() {
    await createConnection()

    const app = express()

    const { AppRouter } = await import('./routes')

    app.set('env', process.env.APP_ENV)

    app.use(AppRouter)

    app.listen(this.port, () => {
      console.log('App is listening on port ', this.port)
    })
  }
}
