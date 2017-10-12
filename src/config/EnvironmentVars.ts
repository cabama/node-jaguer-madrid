import { di, safeEnvironment } from '@seedtag/node-sdk'

@di.Provide()
export class EnvironmentVars {
  mongoHosts = safeEnvironment.require('MONGO_MAIN_HOSTS')
  mongoParams = safeEnvironment.get('MONGO_MAIN_PARAMS', '')
  readonly mongoConnStr = `mongodb://${this.mongoHosts}/blacklist?${this.mongoParams}`
  readonly mongoOpts = JSON.parse(safeEnvironment.require('MONGO_JSON_OPTS'))
}
