import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Mite from '../src/index';
import { MiteOptions } from '@/types';

describe('Mite', () => {
    let mite: Mite | undefined;

    beforeEach(() => {
        mite = new Mite();
    });

    afterEach(() => {
        mite = undefined;
    });

    describe('init', () => {
        it('should initialize watcher with correct options', () => {
            const options: MiteOptions = {
                ignoreInitial: true,
                ignored: /(\.|\/)\../,
                persistent: true,
                paths: './test-path',
            };

            mite?.init(options);

            expect(mite?.watcher).toBeDefined();
            expect(mite?.options).toEqual(options);
        });
    });

    describe('on', () => {
        it('should throw error if watcher is not initialized', () => {
            const callback = vi.fn();

            expect(() => mite?.on(['add'], callback)).toThrow(
                'Watcher is not initialized. Please call init() before setting up event listeners.'
            );
        });

        it('should set up event listeners correctly', () => {
            mite?.init({ paths: './test-path' });
            const callback = vi.fn();

            // @ts-expect-error: Ignore TS error for testing purposes
            const onSpy = vi.spyOn(mite?.watcher, 'on');

            mite?.on(['add', 'change'], callback);

            expect(onSpy).toHaveBeenCalledTimes(2);
            expect(onSpy).toHaveBeenCalledWith('add', expect.any(Function));
            expect(onSpy).toHaveBeenCalledWith('change', expect.any(Function));
        });

        it('should trigger callback when "add" event occurs', () => {
            mite?.init({ paths: './test-path' });
            const callback = vi.fn();

            mite?.on(['add'], callback);

            // Simulate the "add" event
            mite?.watcher?.emit('add', 'test-file.txt');

            expect(callback).toHaveBeenCalledWith('test-file.txt');
        });

        it('should trigger callback when "all" event occurs', () => {
            mite?.init({ paths: './test-path' });
            const callback = vi.fn();

            mite?.on(['all'], callback);

            // Simulate the "all" event
            mite?.watcher?.emit('all', 'add', 'test-file.txt');

            expect(callback).toHaveBeenCalledWith('add', 'test-file.txt');
        });
    });

    describe('stop', () => {
        it('should stop the watcher', async () => {
            mite?.init({ paths: './test-path' });

            // @ts-expect-error: Ignore TS error for testing purposes
            const closeSpy = vi.spyOn(mite?.watcher, 'close');

            await mite?.stop();

            expect(closeSpy).toHaveBeenCalled();
            expect(mite?.watcher).toBeUndefined();
        });

        it('should throw error if stop is called without initialization', async () => {
            await expect(mite?.stop()).rejects.toThrow(
                'Watcher is not initialized or already stopped.'
            );
        });
    });
});
