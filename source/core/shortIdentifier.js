import { pattern } from './identifier';

/**
 * There are 66 URL safe characters. Base 65 is the most compressed URL safe representation of a number.
 * https://stackoverflow.com/a/695469/3012550
 */

//                       0         10                        36  40                       65
//                       v         v                         v   v                        v
const sixtyFivenaries = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-.~abcdefghijklmnopqrstuvwxyz';

function compress(identifier) {
  const parsed = identifier.match(pattern);
  if (!parsed) {
    throw new Error(`'${identifier}' does not match /^[0-9]{2}-[0-9]{3}-[0-9]{3}$/`);
  }
  const { book: book0, chapter: chapter0, verse: verse0 } = parsed.groups;
  const { book, chapter, verse } = specialCompressingCases[book0] ? specialCompressingCases[book0](chapter0, verse0) : { book: book0, chapter: chapter0, verse: verse0 };
  const numericId = Number(`${book}${("00" + chapter).slice(-2)}${("00" + verse).slice(-2)}`);
  return ('00000' + toBaseSixtyFive(numericId)).slice(-4);
}

const specialCompressingCases = {
  [19]: (chapter, verse) => {
    if (chapter > 99 && verse > 99) return { book: 68, chapter: (Number(chapter) - 100).toString(), verse: (Number(verse) - 100).toString() };
    if (chapter > 99) return { book: 67, chapter: (Number(chapter) - 100).toString(), verse};
    return { book: 19, chapter, verse };
  },
}

const specialExpandingCases = {
  '67': (chapter, verse) => ({ book: 19, chapter: 100 + Number(chapter), verse }),
  '68': (chapter, verse) => ({ book: 19, chapter: 100 + Number(chapter), verse: 100 + Number(verse) }),
}

function expand(shortIdentifier) {
  const shortIdentifierPattern = /^[0-9a-zA-Z~._-]{4}$/;
  if (!shortIdentifier.match(shortIdentifierPattern)) {
    throw new Error(`'${shortIdentifier}' does not match ${shortIdentifierPattern}`);
  }
  const numericId = fromBaseSixtyFive(shortIdentifier);
  const [i6, i5, i4, i3, i2, i1] = `000000${numericId}`.split('').reverse();
  const book0 = i1 + i2;
  const chapter0 = i3 + i4;
  const verse0 = i5 + i6;
  const { book, chapter, verse } = specialExpandingCases[book0]
    ? specialExpandingCases[book0](chapter0, verse0)
    : { book: book0, chapter: chapter0, verse: verse0 };
  return [book, ("000" + chapter).slice(-3), ("000" + verse).slice(-3)].join('-');
}

function toBaseSixtyFive(number) {
  if (number === 0) return '';
  const leastSignificant = number % 65;
  const leastSignificantSixtyFivenary = sixtyFivenaryFromBaseTen(leastSignificant);
  const remainder = Math.floor(number / 65);
  return `${toBaseSixtyFive(remainder)}${leastSignificantSixtyFivenary}`;
}

function fromBaseSixtyFive(baseSixtyFive) {
  return baseSixtyFive.split('').reverse()
    .map((sixtyFivenary, power) => baseTenFromSixtyFivenary(sixtyFivenary) * (65 ** power))
    .reduce((all, one) => all + one, 0);
}

function sixtyFivenaryFromBaseTen(number) {
  return sixtyFivenaries[number];
}

function baseTenFromSixtyFivenary(sixtyFivenary) {
  return sixtyFivenaries.indexOf(sixtyFivenary);
}

module.exports = { compress, expand };
