
import { di, gCloudTrace, gCloudDebug } from '@seedtag/node-sdk'

@di.Provide()
export class GoogleTrace {
  start () {
    if (process.env.NODE_ENV === 'production') {
      gCloudTrace.start()
      gCloudDebug.start()
    }
  }
}
