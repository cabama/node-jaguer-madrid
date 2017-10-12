import { di, express, userMiddleware, bodyParser } from '@seedtag/node-sdk'
import { serve, setup } from 'swagger-ui-express'
import * as methodOverride from 'method-override'
import { Logger } from './Logger'
import { ShutdownHandler } from './ShutdownHandler'
import { GoogleTrace } from './GoogleTrace'
import '../controllers'
import { RegisterRoutes } from '../../build/routes'
import { ErrorHandler } from './ErrorHandler'

@di.Provide()
export class Express {

  private _app

  constructor (
    private log: Logger,
    private shutdownHandler: ShutdownHandler,
    private errorHandler: ErrorHandler,
    private googleTrace: GoogleTrace) {

    // Start google trace
    googleTrace.start()

    const app = this._app = express()

    log.wrapMiddlewareInLogs(() => {
      app.disable('x-powered-by')
      app.enable('trust proxy')

      if (process.env.NODE_ENV === 'development') {
        app.use('/docs', serve, setup(require('swagger.json')))
      }

      app.use(userMiddleware.user())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.use(methodOverride())
      app.get('/status', (req, res) => res.sendStatus(200))
      RegisterRoutes(app)
    }, app)

    app.use(errorHandler.middleware())
  }

  getExpressApp () {
    return this._app
  }

  listen (port) {
    return new Promise((res) => {
      const server = this._app.listen(port, res)
      this.shutdownHandler.use(this._app, server)
    })
  }
}
