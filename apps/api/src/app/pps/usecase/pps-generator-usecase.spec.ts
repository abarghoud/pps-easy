import { Test, TestingModule } from '@nestjs/testing';

import { PPSGeneratorUseCase } from './pps-generator-usecase.service';
import { IPPSApi, IPPSApiSymbol } from '../third-party/pps-api.interface';
import { mock } from 'jest-mock-extended';
import { PPSProfileDto } from '../domain/pps-profile-dto.model';
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
    const ppsProfileDto = new PPSProfileDto();
    const fakePPSId = 'SAZJ12S12';
    let result: PPSId;

    beforeAll(async () => {
      ppsProfileDto.event_date = new Date('2024-11-01');
      mockPpsApi.finalize.mockResolvedValue(fakePPSId);

      result = await app.get(PPSGeneratorUseCase).generate(ppsProfileDto);
    });

    it("should call PPSApi init with runner's DTO", () => {
      expect(mockPpsApi.init).toHaveBeenCalledWith(ppsProfileDto);
    });

    it("should call PPSApi createProfile with runner's DTO", () => {
      expect(mockPpsApi.createProfile).toHaveBeenCalled();
    });

    it("should call PPSApi finalize method and return the resolved PPS ID", () => {
      expect(mockPpsApi.finalize).toHaveBeenCalled();
      expect(result).toBe(fakePPSId);
    });
  });
});
