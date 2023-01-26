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
  const { book, chapter, verse } = parsed.groups;
  const numericId = Number(`${book}${chapter}${verse}`);
  return ('00000' + toBaseSixtyFive(numericId)).slice(-5);
}

function expand(shortIdentifier) {
  const shortIdentifierPattern = /^[0-9a-zA-Z~._-]{5}$/;
  if (!shortIdentifier.match(shortIdentifierPattern)) {
    throw new Error(`'${shortIdentifier}' does not match ${shortIdentifierPattern}`);
  }
  const numericId = fromBaseSixtyFive(shortIdentifier);
  const [i8, i7, i6, i5, i4, i3, i2, i1] = `00000000${numericId}`.split('').reverse();
  return [i1, i2, '-', i3, i4, i5, '-', i6, i7, i8].join('');
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
