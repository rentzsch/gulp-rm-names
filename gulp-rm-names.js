const path = require('path')
const Writable = require('stream').Writable
const rimraf = require('rimraf')

class RMNames extends Writable {
  constructor (dirPath, opts) {
    super({objectMode: true})
    this._dirPath = dirPath
    this._opts = opts
  }
  _write (vinylObj, encoding, callback) {
    const lastHistoryPath = vinylObj.history[vinylObj.history.length - 1]
    const effectivePath = path.join(this._dirPath, path.basename(lastHistoryPath))

    if (this._opts.dryrun) {
      console.log('gulp-rm-names would delete', effectivePath)
      callback(null, vinylObj)
    } else {
      rimraf(effectivePath, {glob: false}, function (err) {
        callback(err, vinylObj)
      })
    }
  }
}

module.exports = function rmNames (dirPath, opts = {}) {
  return new RMNames(dirPath, opts)
}
