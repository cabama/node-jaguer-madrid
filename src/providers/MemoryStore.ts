import { di } from '@seedtag/node-sdk'
import * as R from 'ramda'

@di.Provide()
export class MemoryStore {

  private _store = {}

  get (path: string) {
    let lensPath = R.lensPath(path.split('.'))
    return R.view(lensPath)(this._store)
  }

  set (path, value) {
    let lensPath = R.lensPath(path.split('.'))
    this._store = R.set(lensPath, value)(this._store)
  }

  serialize () {
    return JSON.stringify(this._store)
  }

  deserialize (value: string) {
    this._store = JSON.parse(value)
  }
}
