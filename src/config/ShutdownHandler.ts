import { di } from '@seedtag/node-sdk'
import { Logger } from './Logger'

@di.Provide()
export class ShutdownHandler {
  constructor (private logger: Logger) {}

  use (app, server) {
    // Handle 0 downtime between express and kubernetes
    app.disable('dying')
    process.on('SIGTERM', () => {
      this.logger.info('dying')
      app.enable('dying')
      setTimeout(() => {
        server.close(() => {
          this.logger.info('(+_+)')
          process.exit(0)
        })
      }, 10000)
    })
  }
}
