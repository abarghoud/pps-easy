export const IPPSStepListSymbol = Symbol.for("IPPSStepList");

export interface IPPSStep {
  doStep(): Promise<string | void>;
}
