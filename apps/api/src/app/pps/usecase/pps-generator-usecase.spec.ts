import { Test, TestingModule } from '@nestjs/testing';

import { PPSGeneratorUseCase } from './pps-generator-usecase.service';
import { IPPSApi, IPPSApiSymbol } from '../third-party/pps-api.interface';
import { mock } from 'jest-mock-extended';
import { PPSId } from '../domain/pps-id.type';

describe('The PPSGeneratorUseCase class', () => {
  let app: TestingModule;
  const mockPpsApi = mock<IPPSApi>();

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        PPSGeneratorUseCase,
        { provide: IPPSApiSymbol, useValue: mockPpsApi },
      ]
    }).compile();
  });

  it('should be defined', () => {
    expect(app.get<PPSGeneratorUseCase>(PPSGeneratorUseCase)).toBeDefined();
  });

  describe('The generate method', () => {
    const fakePPSId = 'SAZJ12S12';
    let result: PPSId;

    beforeAll(async () => {
      mockPpsApi.run.mockResolvedValue(fakePPSId);

      result = await app.get(PPSGeneratorUseCase).generate();
    });

    it("should call PPSApi run method and return the resolved PPS ID", () => {
      expect(mockPpsApi.run).toHaveBeenCalled();
      expect(result).toBe(fakePPSId);
    });
  });
});
