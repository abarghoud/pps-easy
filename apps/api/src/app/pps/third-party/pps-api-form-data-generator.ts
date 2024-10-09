import { PPSProfileDTOToRunnerPersonalInfos } from '../domain/pps-profile-dto-to-runner-personal-infos';

export const getDefaultPPSFormData = (authenticityToken: string): FormData => {
  const formData = new FormData();

  formData.append('authenticity_token', authenticityToken);
  formData.append('button', '');
  formData.append('_method', 'patch');

  return formData;
}

export class PPSApiFormDataGenerator {
  public constructor(private readonly ppsProfileDTOToRunnerPersonalInfos: PPSProfileDTOToRunnerPersonalInfos) {
  }

  public generateEventDateFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[race_date]', this.ppsProfileDTOToRunnerPersonalInfos.eventDate.toFormat('dd-MM-yyyy'));

    return formData;
  }

  public generatePersonalInfoFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[gender]', this.ppsProfileDTOToRunnerPersonalInfos.gender);
    formData.append('course[last_name]', this.ppsProfileDTOToRunnerPersonalInfos.lastname);
    formData.append('course[first_name]', this.ppsProfileDTOToRunnerPersonalInfos.firstname);
    formData.append('course[birthdate(3i)]', this.ppsProfileDTOToRunnerPersonalInfos.birthdayDay.toString());
    formData.append('course[birthdate(2i)]', this.ppsProfileDTOToRunnerPersonalInfos.birthdayMonth.toString());
    formData.append('course[birthdate(1i)]', this.ppsProfileDTOToRunnerPersonalInfos.birthdayYear.toString());
    formData.append('course[email]', this.ppsProfileDTOToRunnerPersonalInfos.email);

    return formData;
  }

  public generateCardiovascularRisksFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[cardiovascular_risks_video]', '1');
    formData.append('course[cardiovascular_risks_checkbox]', '1');

    return formData;
  }

  public generateRiskFactorsFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[risk_factors_video]', '1');
    formData.append('course[risk_factors_checkbox]', '1');

    return formData;
  }

  public generatePrecautionsFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[precautions_video]', '1');
    formData.append('course[precautions_checkbox]', '1');

    return formData;
  }

  public generateFinalizationFormData(authenticityToken: string): FormData {
    const formData = getDefaultPPSFormData(authenticityToken);

    formData.append('course[finalization_checkbox]', '1');
    formData.append('course[ffa_newsletter]', '0');

    return formData;
  }
}
