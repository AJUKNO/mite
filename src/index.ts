import * as chokidar from 'chokidar';
import {
    MiteAllCallBack,
    MiteCallBack,
    MiteEventName,
    MiteOptions,
} from './types';

/**
 * Mite class provides a wrapper around the chokidar file system watcher.
 * It allows for easy initialization, event handling, and graceful shutdown of the watcher.
 */
class Mite {
    watcher?: chokidar.FSWatcher;
    options?: MiteOptions;

    init(options: MiteOptions) {
        this.options = options;
        this.watcher = chokidar.watch(options.paths, {
            ignoreInitial: true,
            ignored: /([./])\../,
            persistent: true,
            ...options,
        });
    }

    on(
        events: MiteEventName[],
        callback: MiteCallBack | MiteAllCallBack
    ): void {
        if (!this.watcher) {
            throw new Error(
                'Watcher is not initialized. Please call init() before setting up event listeners.'
            );
        }

        events.forEach((event) => {
            if (event === 'all') {
                this.watcher.on(event, async (eventName, path) => {
                    await (callback as MiteAllCallBack)(eventName, path);
                });
            } else {
                this.watcher.on(event, async (path) => {
                    await (callback as MiteCallBack)(path);
                });
            }
        });
    }

    async stop(): Promise<void> {
        if (!this.watcher) {
            throw new Error('Watcher is not initialized or already stopped.');
        }

        await this.watcher.close();
        this.watcher = undefined; // Clean up watcher reference
    }
}

export const mite = new Mite();

export default Mite;
