import { ChallengeResultData } from '@pps-easy/recaptcha/contracts';

export class ChallengeResult {
  constructor(private readonly challengeResultData: ChallengeResultData) {
  }

  public checkIsValid(): boolean {
    if (!this.challengeResultData.isValid || this.challengeResultData.score < 0.5) {
      return false;
    }

    return this.challengeResultData.isValid;
  }
}
