import webpack from 'webpack'
import fs from 'fs'
import path from 'path'

export class FixHexoidError {
  static name = 'FixHexoidError'

  constructor(options) {
    this.options = options || {}
  }

  apply(compiler) {
    const { name } = FixHexoidError
    const { file } = this.options
    compiler.hooks.afterEmit.tap(name, () => {
      const _content = fs.readFileSync(file, 'utf8')
      fs.writeFile(
        file,
        _content.replace('toHexoId = hexoid', 'toHexoId = hexoid.default'),
        (err) => {
          if (err) throw err
          console.log('------------ Fix Hexoid Success! ------------')
        }
      )
    })
  }
}
