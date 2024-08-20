import * as chokidar from 'chokidar';

/**
 * Interface representing the Mite class functionality.
 * Provides methods to initialize a file watcher, set up event listeners, and stop the watcher.
 */
export interface IMite {
    options?: MiteOptions;
    watcher?: chokidar.FSWatcher;

    /**
     * Initializes the Mite watcher with the provided options.
     *
     * @param {MiteOptions} options - Configuration options for the file watcher, including paths to watch and additional options.
     * @throws {Error} Will throw an error if the watcher initialization fails.
     */
    init(options: MiteOptions): void;

    /**
     * Sets up event listeners on the watcher.
     *
     * @param {MiteEventName[]} events - Array of event names to listen to (e.g., 'add', 'change', 'unlink', etc.).
     * @param {MiteCallBack | MiteAllCallBack} callback - Callback function to execute when the specified events are triggered.
     * @throws {Error} Will throw an error if the watcher is not initialized.
     */
    on(events: MiteEventName[], callback: MiteCallBack | MiteAllCallBack): void;

    /**
     * Stops the watcher and releases resources.
     *
     * @returns {Promise<void>} A promise that resolves when the watcher has successfully stopped.
     * @throws {Error} Will throw an error if the watcher is not initialized or is already stopped.
     */
    stop(): Promise<void>;
}

/**
 * Configuration options for the Mite watcher.
 */
export interface MiteOptions extends chokidar.WatchOptions {
    paths: string | ReadonlyArray<string>;
}

/**
 * Supported event names for the Mite watcher
 */
export type MiteEventName =
    | 'add'
    | 'addDir'
    | 'change'
    | 'unlink'
    | 'unlinkDir'
    | 'all';

/**
 * Callback type for specific events (e.g., 'add', 'change', etc.)
 * @param path - The path of the file or directory that triggered the event
 */
export type MiteCallBack = (path: string) => void;

/**
 * Callback type for the 'all' event, which includes the event name
 * @param eventName - The name of the event that was triggered
 * @param path - The path of the file or directory that triggered the event
 */
export type MiteAllCallBack = (eventName: MiteEventName, path: string) => void;
