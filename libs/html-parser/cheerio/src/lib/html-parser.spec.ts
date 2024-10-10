import { HtmlParser } from './html-parser';

describe('The HtmlParser class', () => {
  const htmlParser = new HtmlParser();
  const inputValue = 'here you go!'
  const html = `<div><input type="hidden" name="whatever" value="${inputValue}"/></div>`;

  describe('The findWithSelector method', () => {
    it('should retrieve the searched element', () => {
      const value = htmlParser.getInputValueByName(html, 'whatever');

      expect(value).toBe(inputValue);
    });
  });
});
