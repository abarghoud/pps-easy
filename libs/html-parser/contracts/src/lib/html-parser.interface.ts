export const IHtmlParserSymbol = Symbol.for("IHtmlParser");

export interface IHtmlParser {
  getInputValueByName(html: string, name: string): string | string[] | undefined;
}
