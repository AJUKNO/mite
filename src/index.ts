import chokidar, { FSWatcher, WatchOptions } from 'chokidar'
import { IMite, MiteConfig, MiteEventName } from '@/types'

/**
 * Mite class
 * @class
 * @implements {IMite}
 */
class Mite implements IMite {
  paths: string | readonly string[] | undefined
  options: WatchOptions | undefined
  watcher: FSWatcher | undefined

  init(config: MiteConfig) {
    this.paths = config.paths
    this.options = config.options || {}

    this.watcher = chokidar.watch(this.paths, {
      ignoreInitial: true,
      ignored: /(\.|\/)\../,
      persistent: true,
      ...this.options,
    })
  }

  on(
    events: MiteEventName[],
    callback: (path: string) => Promise<void> | void
  ): void {
    if (!this.watcher) {
      throw new Error('Watcher is not initialized')
    }

    events.forEach((event) => {
      this.watcher?.on(event, async (path) => await callback(path))
    })
  }

  async stop(): Promise<void> {
    this.watcher?.close()
  }
}

const mite = new Mite()

export default mite
