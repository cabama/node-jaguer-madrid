import { di } from '@seedtag/node-sdk'
import { Express, DbConnection, Logger } from './config'
import { MemoryStore } from './providers/MemoryStore'

@di.Bootstrap()
class Main {
  constructor (
    private express: Express,
    private memoryStore: MemoryStore,
    private log: Logger,
    private db: DbConnection) { this.main() }

  async main () {
    const server = await this.express.listen(3000)

    // Store reference to server
    this.memoryStore.set('app', this.express.getExpressApp())
    this.memoryStore.set('server', server)

    this.log.info('App is listening on 3000')
  }
}
