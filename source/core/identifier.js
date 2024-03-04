const { bookList, getNumberForBookName } = require('./bookList');

const reverseBookList = Object.entries(bookList)
  .reduce((all, one) => { all[one[1]] = one[0]; return all; }, {});

const pattern = /^(?<book>[0-9]{2})-(?<chapter>[0-9]{3})-(?<verse>[0-9]{3})$/;

function reference(identfier) {
  const [ ,bookNumber, chapterNumber, verseNumber] = identfier.match(/(\d+)-(\d+)-(\d+)/);
  const bookName = reverseBookList[parseInt(bookNumber)];
  return `${bookName} ${parseInt(chapterNumber)}:${parseInt(verseNumber)}`;
}

function identifier(reference) {
  const [_, book, chapter, verse] = parseReference(reference);
  const bookNumber = getNumberForBookName(book);
  if (!bookNumber) {
    throw new Error(`Unknown book title "${book}".`);
  }
  return [
    zeroPad(bookNumber, 2),
    zeroPad(chapter, 3),
    zeroPad(verse, 3),
  ].join('-');
}

function zeroPad(number, length) {
  const padded = Array(length).join("0") + number;
  return padded.substring(padded.length - length);
}

function parseReference(reference) {
  const pattern = /(.*) (\d+):(\d+)/;
  const match = reference.match(pattern);
  if (!match) {
    throw new Error(`Failed to parse "${reference}". Expected it to match ${pattern}, but id did not.`);
  }
  return match;
}

module.exports = { identifier, reference, pattern };
