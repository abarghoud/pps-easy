import { beforeEach, describe, expect, test } from 'vitest';

import { ChallengeResultData } from '@pps-easy/recaptcha/contracts';

import { ChallengeResult } from './challenge-result';

describe('The RecaptchaChallenge class', () => {
  describe('The checkIsValid method', () => {
    describe('when the challenge is not valid', () => {
      test('it should return false', () => {
        const notValidChallengeResultData: ChallengeResultData = {
          score: 0,
          isValid: false,
          reasons: [],
        };
        const challengeResult = new ChallengeResult(notValidChallengeResultData);

        expect(challengeResult.checkIsValid()).toBe(
          notValidChallengeResultData.isValid
        );
      });
    });

    describe('When challenge is valid', () => {
      let validChallengeResultData: ChallengeResultData;

      beforeEach(() => {
        validChallengeResultData = {
          score: 0,
          isValid: true,
          reasons: [],
        };
      });

      test('should return false if the score is less than 0.5', () => {
        validChallengeResultData.score = 0.3;
        const lowScoreChallengeResult = new ChallengeResult(validChallengeResultData);

        expect(lowScoreChallengeResult.checkIsValid()).toBe(false);
      });

      test('should return true if the score is greater than 0.5', () => {
        validChallengeResultData.score = 0.7;
        const highScoreChallengeResult = new ChallengeResult(validChallengeResultData);

        expect(highScoreChallengeResult.checkIsValid()).toBe(true);
      });
    });
  });
});
