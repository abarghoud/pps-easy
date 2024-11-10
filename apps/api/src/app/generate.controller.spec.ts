import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { GenerateController } from './generate.controller';
import { PPSProfileDto } from './pps/domain/pps-profile-dto.model';
import { IPPSGenerateUseCase, IPPSGenerateUseCaseSymbol } from './pps/usecase/pps-generate-usecase.interface';
import { IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';
import { LocalRecaptchaChecker } from '@pps-easy/recaptcha/google';

describe('The GenerateController class', () => {
  let app: TestingModule;
  const ppsGeneratorUseCase = mock<IPPSGenerateUseCase>();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GenerateController],
      providers: [
        { provide: IPPSGenerateUseCaseSymbol, useValue: ppsGeneratorUseCase },
        { provide: IRecaptchaCheckerSymbol, useClass: LocalRecaptchaChecker },
      ],
    }).compile();
  });

  describe('The generate method', () => {
    const generateResolvedValue = 'ppsId';

    beforeEach(() => {
      ppsGeneratorUseCase.generate.mockResolvedValue(generateResolvedValue)
    });

    afterEach(() => {
      ppsGeneratorUseCase.generate.mockRestore();
    })

    it('should pass dto to ppsGenerator generate method and return its resolved value', () => {
      const generateController = app.get<GenerateController>(GenerateController);
      const ppsProfileDto = new PPSProfileDto();
      const promise = generateController.generate(ppsProfileDto);

      expect(ppsGeneratorUseCase.generate).toHaveBeenCalled();
      expect(promise).resolves.toEqual(generateResolvedValue);
    });
  });
});
