import { identifier } from './identifier';

describe('identifier', () => {
  Object.entries({
    'Genesis 1:1': '1-1-1',
    'Genesis 1:31': '1-1-31',
    'Genesis 2:1': '1-2-1',
    'Revelation 22:21': '66-22-21',
  }).forEach(([from, to]) => {
    it(`converts from ${from} to ${to}`, () => {
      expect(identifier(from)).toEqual(to);
    });
  });

  it('throws a helpful error if the reference cannot be parsed', () => {
    expect(() => identifier('Jude 2')).toThrow('Failed to parse "Jude 2". Expected it to match /(.*) (\\d+):(\\d+)/, but id did not.');
  });
});
