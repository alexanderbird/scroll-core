import { identifier, reference } from './identifier';

describe('identifier', () => {
  Object.entries({
    'Genesis 1:1': '01-001-001',
    'Genesis 1:31': '01-001-031',
    'Genesis 2:1': '01-002-001',
    'Genesis 2:1': '01-002-001',
    'Psalms 119:176': '19-119-176',
    'Psalm 119:176': '19-119-176',
    'Revelation 22:21': '66-022-021',
  }).forEach(([from, to]) => {
    it(`converts from ${from} to ${to}`, () => {
      expect(identifier(from)).toEqual(to);
    });
  });

  Object.entries({
    'Genesis 1:1': '01-001-001',
    'Genesis 1:31': '01-001-031',
    'Genesis 2:1': '01-002-001',
    'Genesis 2:1': '01-002-001',
    'Psalms 119:176': '19-119-176',
    'Revelation 22:21': '66-022-021',
  }).forEach(([from, to]) => {
    it(`converts converts back from ${to} to ${from}`, () => {
      expect(reference(to)).toEqual(from);
    });
  });

  it('throws a helpful error if the reference cannot be parsed', () => {
    expect(() => identifier('Jude 2')).toThrow('Failed to parse "Jude 2". Expected it to match /(.*) (\\d+):(\\d+)/, but id did not.');
  });

  it('throws a helpful error if the book is unknown', () => {
    expect(() => identifier('Judeee 2:1')).toThrow('Unknown book title "Judeee".');
  });
});
