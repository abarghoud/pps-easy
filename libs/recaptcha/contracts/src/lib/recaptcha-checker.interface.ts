export interface ChallengeResultData {
  score: number;
  reasons: string[];
  isValid: boolean;
}

export enum RecaptchaInvalidityReason {
  CLASSIFICATION_REASON_UNSPECIFIED = 'CLASSIFICATION_REASON_UNSPECIFIED',
  AUTOMATION = 'AUTOMATION',
  UNEXPECTED_ENVIRONMENT = 'UNEXPECTED_ENVIRONMENT',
  TOO_MUCH_TRAFFIC = 'TOO_MUCH_TRAFFIC',
  UNEXPECTED_USAGE_PATTERNS = 'UNEXPECTED_USAGE_PATTERNS',
  LOW_CONFIDENCE_SCORE = 'LOW_CONFIDENCE_SCORE',
  SUSPECTED_CARDING = 'SUSPECTED_CARDING',
  SUSPECTED_CHARGEBACK = 'SUSPECTED_CHARGEBACK'
}

export const IRecaptchaCheckerSymbol = Symbol.for('IRecaptchaChecker');

export interface IRecaptchaChecker {
  check(token: string): Promise<ChallengeResultData>;
}
