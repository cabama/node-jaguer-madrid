import { mongoose, di } from '@seedtag/node-sdk'
import { EnvironmentVars } from './EnvironmentVars'
import { Logger } from './Logger'

@di.Provide()
export class DbConnection {
  constructor (env: EnvironmentVars, log: Logger) {
    mongoose.connect(env.mongoConnStr, env.mongoOpts, err => {
      if (err) throw err
      log.info('Successfully connected to MongoDB')
    })
  }
}
