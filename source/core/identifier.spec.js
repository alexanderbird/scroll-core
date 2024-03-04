const { identifier, reference } = require('./identifier');

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

  it('handles book abbreviations', () => {
    const abbreviations = [ '1CH', '1CO', '1JN', '1KI', '1PE', '1SA', '1TH', '1TI', '2CH', '2CO', '2JN', '2KI', '2PE', '2SA', '2TH', '2TI', '3JN', 'ACT', 'AMO', 'COL', 'DAN', 'DEU', 'ECC', 'EPH', 'EST', 'EXO', 'EZK', 'EZR', 'GAL', 'GEN', 'HAB', 'HAG', 'HEB', 'HOS', 'ISA', 'JAS', 'JDG', 'JER', 'JHN', 'JOB', 'JOL', 'JON', 'JOS', 'JUD', 'LAM', 'LEV', 'LUK', 'MAL', 'MAT', 'MIC', 'MRK', 'NAM', 'NEH', 'NUM', 'OBA', 'PHM', 'PHP', 'PRO', 'PSA', 'REV', 'ROM', 'RUT', 'SNG', 'TIT', 'ZEC', 'ZEP' ];
    const expected = [
      '1 Chronicles',
      '1 Corinthians',
      '1 John',
      '1 Kings',
      '1 Peter',
      '1 Samuel',
      '1 Thessalonians',
      '1 Timothy',
      '2 Chronicles',
      '2 Corinthians',
      '2 John',
      '2 Kings',
      '2 Peter',
      '2 Samuel',
      '2 Thessalonians',
      '2 Timothy',
      '3 John',
      'Acts',
      'Amos',
      'Colossians',
      'Daniel',
      'Deuteronomy',
      'Ecclesiastes',
      'Ephesians',
      'Esther',
      'Exodus',
      'Ezekiel',
      'Ezra',
      'Galatians',
      'Genesis',
      'Habakkuk',
      'Haggai',
      'Hebrews',
      'Hosea',
      'Isaiah',
      'James',
      'Judges',
      'Jeremiah',
      'John',
      'Job',
      'Joel',
      'Jonah',
      'Joshua',
      'Jude',
      'Lamentations',
      'Leviticus',
      'Luke',
      'Malachi',
      'Matthew',
      'Micah',
      'Mark',
      'Nahum',
      'Nehemiah',
      'Numbers',
      'Obadiah',
      'Philemon',
      'Philippians',
      'Proverbs',
      'Psalms',
      'Revelation',
      'Romans',
      'Ruth',
      'Song of Songs',
      'Titus',
      'Zechariah',
      'Zephaniah',
    ];

    const actual = abbreviations.map(x => identifier(x + ' 1:1')).map(x => reference(x));
    expect(actual).toEqual(expected.map(x => x + ' 1:1'));
  });
});
