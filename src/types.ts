import { FSWatcher, WatchOptions } from 'chokidar'

/**
 * Mite event names
 */
export type MiteEventName =
  | 'add'
  | 'addDir'
  | 'change'
  | 'unlink'
  | 'unlinkDir'
  | 'all'

/**
 * Mite interface
 * @interface
 * @property {string | readonly string[] | undefined} paths - Paths to watch
 * @property {WatchOptions | undefined} options - Watch options
 * @property {FSWatcher | undefined} watcher - Chokidar watcher instance
 */
export interface IMite {
  paths: string | readonly string[] | undefined
  options: WatchOptions | undefined
  watcher: FSWatcher | undefined

  /**
   * Initialize Mite
   * @param config
   * @returns void
   */
  init(config: MiteConfig): void

  /**
   * Add event listener
   * @param callback
   * @param events
   * @returns void
   */
  on(
    events: MiteEventName[],
    callback: (path: string) => Promise<void> | void
  ): void

  /**
   * Stop watching
   * @returns void
   */
  stop(): Promise<void>
}

/**
 * Mite configuration
 * @interface
 * @property {string | readonly string[]} paths - Paths to watch
 * @property {WatchOptions} [options] - Watch options
 */
export interface MiteConfig {
  paths: string
  options?: WatchOptions
}
