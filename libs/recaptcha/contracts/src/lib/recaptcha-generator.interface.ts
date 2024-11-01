export interface IRecaptchaGenerator {
  generate(): Promise<string>;
}
