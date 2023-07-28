import enGB from './en-GB.json';
import deDE from './de-DE.json';

const notTranslated = '__NOT_TRANSLATED__';

describe('i18n assets', () => {
  it('should have valid values', () => {
    expect(JSON.stringify(enGB).includes(notTranslated)).toBeFalsy();
    expect(JSON.stringify(deDE).includes(notTranslated)).toBeFalsy();
  });
});
