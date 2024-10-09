import { load } from 'cheerio';

import { IHtmlParser } from '@easy-pps/html-parser/contracts';

export class HtmlParser implements IHtmlParser{
  public getInputValueByName(html: string, name: string): string | string[] | undefined {
    const $ = load(html);

    return $(`input[name="${name}"]`)?.val();
  }
}
