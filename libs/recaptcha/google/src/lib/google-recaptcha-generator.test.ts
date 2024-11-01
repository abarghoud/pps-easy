import { afterEach, beforeAll, describe, expect, it } from 'vitest';

import { GoogleRecaptchaGenerator } from './google-recaptcha-generator';

describe('The GoogleRecaptchaGenerator class', () => {
  const recaptchaKey = 'TheKey';
  const googleRecaptchaGenerator = new GoogleRecaptchaGenerator(recaptchaKey);

  describe('The generate method', () => {
    afterEach(() => {
      global.grecaptcha.enterprise.execute.mockClear();
    });

    it('should call recaptcha enterprise execute method with the provided recaptcha key and resolves the resolved result', () => {
      googleRecaptchaGenerator.generate();

      expect(global.grecaptcha.enterprise.execute).toHaveBeenCalledWith(recaptchaKey);
    });

    describe('When grecaptcha execute method resolves', () => {
      const recpatchaToken = 'TheKey';

      beforeAll(() => {
        global.grecaptcha.enterprise.execute.mockResolvedValueOnce(recpatchaToken);
      });

      it('should resolve the resolved token from grecaptcha', () => {
        expect(googleRecaptchaGenerator.generate()).resolves.toBe(recaptchaKey);
      });
    });

    describe('When grecaptcha execute method rejects', () => {
      beforeAll(() => {
        global.grecaptcha.enterprise.execute.mockRejectedValue('');
      });

      it('should reject', () => {
        expect(googleRecaptchaGenerator.generate()).rejects.toBe('');
      });
    });
  });
});
