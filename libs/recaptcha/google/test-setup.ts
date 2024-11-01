import { afterAll, beforeAll, vi } from 'vitest';

beforeAll(() => {
  global.grecaptcha = {
    enterprise: {
      ready: vi.fn().mockImplementation((readyCallback) => {
        readyCallback();
      }),
      execute: vi.fn(),
    }
  };
});

afterAll(() => {
  delete global.grecaptcha;
});
