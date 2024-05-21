<p align="center">
  <img src="./.github/assets/mite-banner.png" alt="Mite banner">
</p>

<p align="center">
  Mite is a simple tool to watch file changes. It is built with TypeScript and uses the Chokidar library for file watching.
</p>

## Features

- Watches for file changes in specified paths
- Supports multiple event types including 'add', 'addDir', 'change', 'unlink', 'unlinkDir', and 'all'
- Provides an easy-to-use API to initialize the watcher and add event listeners

## Usage

First, import Mite into your project:

```javascript
import mite from '@hanabi/mite';
```

Then, initialize Mite with the paths you want to watch:

```javascript
mite.init({ paths: '.' });
```

You can add event listeners using the `on` method:

```javascript
mite.on(['add'], (path) => {
  console.log(`File added: ${path}`);
});
```

## API

### `init(config: MiteConfig): void`

Initializes Mite with the given configuration. The `config` object should have the following properties:

- `paths`: A string or an array of strings specifying the paths to watch
- `options` (optional): An object specifying the watch options

### `on(events: MiteEventName[], callback: (path: string) => Promise<void> | void): void`

Adds an event listener. The `events` parameter is an array of event names to listen for. The `callback` is a function
that is called when any of the specified events occur.

### `stop(): Promise<void>`

Stops the file watcher.

## Tests

Mite has a suite of tests that can be run using Jest. To run the tests, use the following command:

```bash
npm run test
```

## License

Mite is licensed under the ISC license.