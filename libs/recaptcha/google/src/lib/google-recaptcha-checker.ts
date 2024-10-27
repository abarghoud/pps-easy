import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { google } from '@google-cloud/recaptcha-enterprise/build/protos/protos';
import ClassificationReason = google.cloud.recaptchaenterprise.v1.RiskAnalysis.ClassificationReason;

import {
  ChallengeResult,
  IRecaptchaChecker,
  RecaptchaInvalidityReason,
} from '@pps-easy/recaptcha/contracts';

const googleReasonsMap: Record<
  ClassificationReason,
  RecaptchaInvalidityReason
> = {
  [ClassificationReason.AUTOMATION]: RecaptchaInvalidityReason.AUTOMATION,
  [ClassificationReason.SUSPECTED_CHARGEBACK]:
    RecaptchaInvalidityReason.SUSPECTED_CHARGEBACK,
  [ClassificationReason.LOW_CONFIDENCE_SCORE]:
    RecaptchaInvalidityReason.LOW_CONFIDENCE_SCORE,
  [ClassificationReason.UNEXPECTED_ENVIRONMENT]:
    RecaptchaInvalidityReason.UNEXPECTED_ENVIRONMENT,
  [ClassificationReason.TOO_MUCH_TRAFFIC]:
    RecaptchaInvalidityReason.TOO_MUCH_TRAFFIC,
  [ClassificationReason.UNEXPECTED_USAGE_PATTERNS]:
    RecaptchaInvalidityReason.UNEXPECTED_USAGE_PATTERNS,
  [ClassificationReason.SUSPECTED_CARDING]:
    RecaptchaInvalidityReason.SUSPECTED_CARDING,
  [ClassificationReason.CLASSIFICATION_REASON_UNSPECIFIED]:
    RecaptchaInvalidityReason.CLASSIFICATION_REASON_UNSPECIFIED,
};

export class GoogleRecaptchaChecker implements IRecaptchaChecker {
  private readonly recaptchaServiceClient: RecaptchaEnterpriseServiceClient;
  private readonly projectPath: string;

  public constructor(private readonly recaptchaKey: string, projectId: string) {
    this.recaptchaServiceClient = new RecaptchaEnterpriseServiceClient();
    this.projectPath = this.recaptchaServiceClient.projectPath(projectId);
  }

  public async check(token: string): Promise<ChallengeResult> {
    const request = ({
      assessment: {
        event: {
          token: token,
          siteKey: this.recaptchaKey,
        },
      },
      parent: this.projectPath,
    });

    const [ response ] = await this.recaptchaServiceClient.createAssessment(request);

    if (!response.tokenProperties?.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
      return {
        score: 0,
        reasons: ['Token is not valid'],
        isValid: false,
      }
    }

    return {
      score: response.riskAnalysis?.score ?? 0,
      reasons: this.mapGoogleReasons(response.riskAnalysis?.reasons || []),
      isValid: true
    };
  }

  private mapGoogleReasons(reasons: ClassificationReason[]): RecaptchaInvalidityReason[] {
    return reasons.map((googleReason) => googleReasonsMap[googleReason] || RecaptchaInvalidityReason.CLASSIFICATION_REASON_UNSPECIFIED);
  }
}
