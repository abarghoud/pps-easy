import { InvalidStepsError, EmptyStepsArrayError, PPSApi } from './pps-api';
import { mock } from 'jest-mock-extended';
import { IPPSStep } from './journey-steps/pps-step.interface';

describe('The PPSApi class', () => {
  describe('The run method', () => {
    describe('When steps list is empty', () => {
      const ppsApi = new PPSApi([]);

      it('should throw NoStepsError error', () => {
        expect(ppsApi.run()).rejects.toBeInstanceOf(EmptyStepsArrayError);
      });
    });

    describe('When steps list is not empty', () => {
      describe('When last step run returns undefined', () => {
        const firstStep = mock<IPPSStep>();
        const secondStep = mock<IPPSStep>();
        const ppsApi = new PPSApi([firstStep, secondStep]);

        beforeAll(() => {
          firstStep.doStep.mockResolvedValueOnce();
          secondStep.doStep.mockResolvedValueOnce();
        });

        it('should throw InvalidSteps error', () => {
          expect(ppsApi.run()).rejects.toBeInstanceOf(InvalidStepsError);
        });
      });

      describe('When last step returns a string', () => {
        const firstStep = mock<IPPSStep>();
        const secondStep = mock<IPPSStep>();
        const ppsApi = new PPSApi([firstStep, secondStep]);
        const mockLastStepResult = 'The result';
        let resultPromise: Promise<string>;

        beforeAll(() => {
          firstStep.doStep.mockResolvedValueOnce();
          secondStep.doStep.mockResolvedValueOnce(mockLastStepResult);

          resultPromise = ppsApi.run();
        });

        it('should run each step', () => {
          expect(firstStep.doStep).toHaveBeenCalled();
          expect(secondStep.doStep).toHaveBeenCalled();
        });

        it('should resolve the result of the last run', () => {
          expect(resultPromise).resolves.toBe(mockLastStepResult);
        });
      });
    });
  })
});
