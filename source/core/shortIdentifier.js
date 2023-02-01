const { pattern } = require('./identifier');
const chapterCompressor = require('./chapterCompressor');

/**
 * There are 66 URL safe characters: alphanumeric and the following four characters: `_-.~`.
 *
 * We can encode every Bible verse reference in three characters by converting the numeric 
 * book-chapter-verse identifier to a number in the range 1..66^3 and then encoding it in base 66.
 *
 * This does include the four non-alphanumeric URL safe characters in the output, which is uglier than
 * an entirely alphanumeric ID. Our current implementation also fits in the range 1..62^3, so we are
 * excluding the non-alphanumeric URL safe characters. However, if there was a reason in the future to
 * move up to 66^3 then we could add those four non-alphanumeric characters while still producing an
 * URL-safe identifier.
 *
 * https://stackoverflow.com/a/695469/3012550
 */

//                  0         10                        36                       62
//                  v         v                         v                        v
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base = 62;

function compress(identifier) {
  const parsed = identifier.match(pattern);
  if (!parsed) {
    throw new Error(`'${identifier}' does not match /^[0-9]{2}-[0-9]{3}-[0-9]{3}$/`);
  }
  const { book: book0, chapter: chapter0, verse: verse0 } = parsed.groups;
  const { book, chapter, verse } = chapterCompressor.compress({ book: book0, chapter: chapter0, verse: verse0 });
  const numericId = Number(`${book}${("00" + chapter).slice(-2)}${("00" + verse).slice(-2)}`);
  return ('00000' + toBaseSixtyTwo(numericId)).slice(-3);
}

function expand(shortIdentifier) {
  const shortIdentifierPattern = /^[0-9a-zA-Z]{3}$/;
  if (!shortIdentifier.match(shortIdentifierPattern)) {
    throw new Error(`'${shortIdentifier}' does not match ${shortIdentifierPattern}`);
  }
  const numericId = fromBaseSixtyTwo(shortIdentifier);
  const [i6, i5, i4, i3, i2, i1] = `000000${numericId}`.split('').reverse();
  const book0 = i1 + i2;
  const chapter0 = i3 + i4;
  const verse0 = i5 + i6;
  const { book, chapter, verse } = chapterCompressor.expand({ book: book0, chapter: chapter0, verse: verse0 });
  return [("00" + book).slice(-2), ("000" + chapter).slice(-3), ("000" + verse).slice(-3)].join('-');
}

function toBaseSixtyTwo(number) {
  if (number === 0) return '';
  const leastSignificant = number % base;
  const leastSignificantCharacter = baseSixtyTwoCharacterFromBaseTen(leastSignificant);
  const remainder = Math.floor(number / base);
  return `${toBaseSixtyTwo(remainder)}${leastSignificantCharacter}`;
}

function fromBaseSixtyTwo(baseSixtyTwo) {
  return baseSixtyTwo.split('').reverse()
    .map((character, power) => baseTenDigitFromBaseSixtyTwoCharacter(character) * (base ** power))
    .reduce((all, one) => all + one, 0);
}

function baseSixtyTwoCharacterFromBaseTen(number) {
  return characters[number];
}

function baseTenDigitFromBaseSixtyTwoCharacter(character) {
  return characters.indexOf(character);
}

module.exports = { compress, expand }
