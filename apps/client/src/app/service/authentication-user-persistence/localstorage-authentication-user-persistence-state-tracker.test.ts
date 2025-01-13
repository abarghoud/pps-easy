import { afterAll, afterEach, beforeAll, beforeEach, expect, MockInstance, vitest } from 'vitest';
import {
  LocalstorageAuthenticationUserPersistenceStateTracker
} from './localstorage-authentication-user-persistence-state-tracker';
import { DateTime } from 'luxon';

describe('The LocalstorageAuthenticationUserPersistenceStateTracker class', () => {
  let instance: LocalstorageAuthenticationUserPersistenceStateTracker;

  beforeAll(() => {
    instance = new LocalstorageAuthenticationUserPersistenceStateTracker();
  });

  describe('The setUpdated method', () => {
    const now = DateTime.now();
    let localstorageSetItemSpy: MockInstance;

    beforeAll(() => {
      localstorageSetItemSpy = vitest.spyOn(Storage.prototype, 'setItem');
      vitest.useFakeTimers();
      vitest.setSystemTime(now.toISO());
    });

    afterAll(() => {
      vitest.useRealTimers();
      localstorageSetItemSpy.mockRestore();
    });

    it('should set current date as a value in localStorage for userEntityUpdatedAt', () => {
      instance.setUpdated();

      expect(localstorageSetItemSpy).toHaveBeenCalledWith('userEntityUpdatedAt', now.toISO());
    });
  });

  describe('The checkShouldUpdate method', () => {
    let localStorageGetItemSpy: MockInstance;

    beforeEach(() => {
      localStorageGetItemSpy = vitest.spyOn(Storage.prototype, 'getItem');
    });

    afterEach(() => {
      localStorageGetItemSpy.mockRestore();
    });

    describe('When no data in localStorage for userEntityUpdatedAt', () => {
      beforeEach(() => {
        localStorageGetItemSpy.mockReturnValueOnce(null);
      });

      it('should return true', () => {
        expect(instance.checkShouldUpdate()).toBe(true);
      });
    });

    describe('When returned date is more than one month ago', () => {
      beforeEach(() => {
        vitest.useFakeTimers();
        vitest.setSystemTime(DateTime.now().toISO());
        localStorageGetItemSpy.mockReturnValueOnce(DateTime.now().minus({ month: 1 }));
      });

      afterEach(() => {
        vitest.useRealTimers();
      });

      it('should return true', () => {
        expect(instance.checkShouldUpdate()).toBe(true);
      });
    });

    describe('When returned date is less than one month ago', () => {
      beforeEach(() => {
        vitest.useFakeTimers();
        vitest.setSystemTime(DateTime.now().toISO());
        localStorageGetItemSpy.mockReturnValueOnce(DateTime.now().minus({ day: 20 }));
      });

      afterEach(() => {
        vitest.useRealTimers();
      });

      it('should return false', () => {
        expect(instance.checkShouldUpdate()).toBe(false);
      });
    });
  });
});
