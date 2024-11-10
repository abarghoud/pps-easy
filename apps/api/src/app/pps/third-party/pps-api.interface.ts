export const IPPSApiSymbol = Symbol.for('IPPSApi');

export interface IPPSApi {
  run(): Promise<string>;
}
