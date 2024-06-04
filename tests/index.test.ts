import mite from '../src'

test('mite throws error if on is called before init', () => {
  expect(() => mite.on(['add'], async (path: string) => {})).toThrow(
    'Watcher is not initialized'
  )
})

test('mite watches files', async () => {
  mite.init({ paths: '.' })
  mite.on(['add'], async (path) => console.log(path))
  mite.watcher?.emit('add', 'file.txt')
  expect(mite.watcher).toBeDefined()
  await mite.stop()
})

test('mite watches files on all changes', async () => {
  mite.init({ paths: '.' })
  mite.on(['all'], async (eventName: any, path: any) =>
    console.log(eventName, path)
  )
  mite.watcher?.emit('all', 'file.txt')
  expect(mite.watcher).toBeDefined()
  await mite.stop()
})
