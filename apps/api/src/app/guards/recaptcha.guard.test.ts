import { Test, TestingModule } from '@nestjs/testing';

import { mock } from 'jest-mock-extended';

import { ChallengeResultData, IRecaptchaChecker, IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';

import { RecaptchaGuard } from './recaptcha.guard';
import { BadRequestException, ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('The RecaptchaGuard', () => {
  let app: TestingModule;
  const recaptchaCheckerMock = mock<IRecaptchaChecker>()
  const executionContextMock = mock<ExecutionContext>();
  const getRequest = jest.fn();

  beforeAll(() => {
    executionContextMock.switchToHttp.mockReturnValue({ getRequest, getNext: jest.fn(), getResponse: jest.fn() });
  });

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        RecaptchaGuard,
        { provide: IRecaptchaCheckerSymbol, useValue: recaptchaCheckerMock }
      ],
    })
      .compile()
  });

  it('should be defined', () => {
    expect(app.get(RecaptchaGuard)).toBeDefined();
  });

  describe('The canActivate method', () => {
    describe('When context http request does not contain body', () => {
      beforeEach(() => {
        getRequest.mockReturnValueOnce({ body: undefined });
      });

      it('should return false', () => {
        const guard = app.get(RecaptchaGuard);

        expect(guard.canActivate(executionContextMock)).toBe(false);
      });
    });

    describe('When context http request body does not contain recaptchaToken', () => {
      beforeEach(() => {
        getRequest.mockReturnValueOnce({ body: {} });
      });

      it('should throw BadRequestException', () => {
        const guard = app.get(RecaptchaGuard);

        expect(() => guard.canActivate(executionContextMock)).toThrow(expect.any(BadRequestException));
      });
    });

    describe('When context http request body contains a not valid recaptchaToken', () => {
      beforeEach(() => {
        const challengeResult: ChallengeResultData = {
          reasons: [],
          score: 0,
          isValid: false,
        }
        recaptchaCheckerMock.check.mockResolvedValue(challengeResult);
        getRequest.mockReturnValueOnce({ body: { recaptchaToken: 'notValidRecaptchaToken' } });
      });

      it('should throw forbidden exception', () => {
        const guard = app.get(RecaptchaGuard);

        expect(guard.canActivate(executionContextMock)).rejects.toEqual(expect.any(ForbiddenException));
      });
    });

    describe('When context http request body contains a bad score check result', () => {
      beforeEach(() => {
        const challengeResult: ChallengeResultData = {
          reasons: [],
          score: 0.4,
          isValid: true,
        }
        recaptchaCheckerMock.check.mockResolvedValue(challengeResult);
        getRequest.mockReturnValueOnce({ body: { recaptchaToken: 'badScoreRecaptchaToken' } });
      });

      it('should throw forbidden exception', () => {
        const guard = app.get(RecaptchaGuard);

        expect(guard.canActivate(executionContextMock)).rejects.toEqual(expect.any(ForbiddenException));
      });
    });

    describe('When context http request body contains a good score check result', () => {
      beforeEach(() => {
        const challengeResult: ChallengeResultData = {
          reasons: [],
          score: 0.6,
          isValid: true,
        }
        recaptchaCheckerMock.check.mockResolvedValue(challengeResult);
        getRequest.mockReturnValueOnce({ body: { recaptchaToken: 'goodScoreRecaptchaToken' } });
      });

      it('should resolve true', () => {
        const guard = app.get(RecaptchaGuard);

        expect(guard.canActivate(executionContextMock)).resolves.toBe(true);
      });
    });
  });
});
