import mite from '../src'

test('mite throws error if on is called before init', () => {
  expect(() => mite.on(['add'], () => {})).toThrow('Watcher is not initialized')
})

test('mite watches files', async () => {
  mite.init({ paths: '.' })
  mite.on(['add'], (path) => console.log(path))
  expect(mite.watcher).toBeDefined()
  await mite.stop()
})
