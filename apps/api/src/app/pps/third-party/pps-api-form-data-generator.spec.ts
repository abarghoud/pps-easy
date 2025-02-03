import { Gender } from '@pps-easy/user/domain';

import { getDefaultPPSFormData, PPSApiFormDataGenerator } from './pps-api-form-data-generator';
import { PPSProfileDTOToRunnerPersonalInfos } from '../domain/pps-profile-dto-to-runner-personal-infos';
import { PPSProfileDto } from '../domain/pps-profile-dto.model';


const getFakePPSDto = (): PPSProfileDto => {
  const ppsDto = new PPSProfileDto();

  ppsDto.event_date = new Date('2024-12-31');
  ppsDto.birthday = new Date('1990-01-01');
  ppsDto.email = 'test@test.com';
  ppsDto.gender = Gender.male;
  ppsDto.lastname = 'DUPONT';
  ppsDto.firstname = 'Marc';

  return ppsDto;
}

describe('The PPSApiFormDataGenerator class', () => {
  let ppsApiFormDataGenerator: PPSApiFormDataGenerator;
  const ppsProfileInfos = new PPSProfileDTOToRunnerPersonalInfos(getFakePPSDto());

  beforeEach(() => {
    ppsApiFormDataGenerator = new PPSApiFormDataGenerator(ppsProfileInfos);
  });

  describe('The generateRaceDateFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and race date', () => {
      const authenticityToken = 'the_token';
      const expectedFormData = getDefaultPPSFormData(authenticityToken);

      expectedFormData.append('course[race_date]', ppsProfileInfos.eventDate.toFormat('dd-MM-yyyy'));

      expect(ppsApiFormDataGenerator.generateEventDateFormData(authenticityToken)).toEqual(expectedFormData);
    });
  });

  describe('The generatePersonalInfoFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and personal info', () => {
      const authenticityToken = 'the_token';

      expect(ppsApiFormDataGenerator.generatePersonalInfoFormData(authenticityToken)).toMatchSnapshot();
    });
  });

  describe('The generateCardiovascularRisksFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and personal info', () => {
      const authenticityToken = 'the_token';

      expect(ppsApiFormDataGenerator.generateCardiovascularRisksFormData(authenticityToken)).toMatchSnapshot();
    });
  });

  describe('The generateRiskFactorsFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and personal info', () => {
      const authenticityToken = 'the_token';

      expect(ppsApiFormDataGenerator.generateRiskFactorsFormData(authenticityToken)).toMatchSnapshot();
    });
  });

  describe('The generatePrecautionsFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and personal info', () => {
      const authenticityToken = 'the_token';

      expect(ppsApiFormDataGenerator.generatePrecautionsFormData(authenticityToken)).toMatchSnapshot();
    });
  });

  describe('The generateFinalizationFormData method', () => {
    it('should return a formData containing the default values with provided authenticity_token and personal info', () => {
      const authenticityToken = 'the_token';

      expect(ppsApiFormDataGenerator.generateFinalizationFormData(authenticityToken)).toMatchSnapshot();
    });
  });
});
