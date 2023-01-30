import * as shortIdentifier from './shortIdentifier';
import everyIdentifier from './spec/everyIdentifier.json'

const examples = [
  '01-001-001', // smallest identifier
  '66-022-021', // largest book number
  '19-100-001', // chapter number packing threshold
  '19-101-001',
  '19-102-001',
  '19-150-006', // largest chapter number
  '19-119-100', // verse number packing threshold
  '19-119-101',
  '19-119-102',
  '19-119-176', // largest verse number
];

describe('shortIdentifier', () => {
  examples.forEach(from => {
    it(`compresses ${from} to exactly 3 URL safe characters`, () => {
      const compressed = shortIdentifier.compress(from);
      // What are URL safe characters? https://stackoverflow.com/a/695469/3012550
      expect(compressed).toMatch(/^[0-9a-zA-Z~._-]{3}$/);
    });
  });

  examples.forEach(from => {
    it(`reversibly compresses ${from}`, () => {
      const compressed = shortIdentifier.compress(from);
      const expanded = shortIdentifier.expand(compressed);
      expect(expanded).toEqual(from);
    });
  });

  it('reversibly compresses the identifier of every Bible verse', () => {
    everyIdentifier.forEach(id => {
      const compressed = shortIdentifier.compress(id);
      const expanded = shortIdentifier.expand(compressed);
      expect(compressed).toMatch(/^[0-9a-zA-Z~._-]{3}$/);
      expect(expanded).toEqual(id);
    });
  });

  [
    '0-000-000',
    '00-00-000',
    '00-000-00',
    '000-000-000',
    '00-0000-000',
    '00-000-0000',
    'ab-cde-fgh',
  ].forEach(id => {
    it(`throws a helpful error when compressing ${id} which does not match the identifier pattern`, () => {
      expect(() => shortIdentifier.compress(id))
        .toThrow(`'${id}' does not match /^[0-9]{2}-[0-9]{3}-[0-9]{3}$/`);
    });
  });

  [
    'aa',
    'aaaa',
    'a?a',
    'a/a',
    'a!a',
  ].forEach(id => {
    it(`throws a helpful error when expanding ${id} which does not match the short identifier pattern`, () => {
      expect(() => shortIdentifier.expand(id))
        .toThrow(`'${id}' does not match /^[0-9a-zA-Z~._-]{3}$/`);
    });
  });
});
