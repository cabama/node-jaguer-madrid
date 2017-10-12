import { log, di } from '@seedtag/node-sdk'

@di.Provide()
export class Logger {

  info = log.info
  warn = log.warn
  error = log.error

  wrapMiddlewareInLogs (f, app) {
    if (process.env.NODE_ENV === 'development') app.use(log.httpLoggerMiddleware())
    app.use(log.preErrorReporterMiddleware())
    f()
    app.use(log.errorLoggerMiddleware())
    app.use(log.errorReporterMiddleware())
  }
}
