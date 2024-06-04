import chokidar, { FSWatcher, WatchOptions } from 'chokidar'
import { IMite, MiteAllCallBack, MiteCallBack, MiteConfig, MiteEventName } from '@/types'

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

  on(events: MiteEventName[], callback: MiteCallBack): void
  on(events: MiteEventName[], callback: MiteAllCallBack): void

  on(events: MiteEventName[], callback: MiteCallBack | MiteAllCallBack): void {
    if (!this.watcher) {
      throw new Error('Watcher is not initialized')
    }

    events.forEach((event) => {
      if (event === 'all') {
        this.watcher?.on(
          event,
          async (eventName: MiteEventName, path: string) => {
            await (callback as MiteAllCallBack)(eventName, path)
          }
        )
      } else {
        this.watcher?.on(event, async (path: string) => {
          await (callback as MiteCallBack)(path)
        })
      }
    })
  }

  async stop(): Promise<void> {
    await this.watcher?.close()
  }
}

const mite = new Mite()

export default mite
