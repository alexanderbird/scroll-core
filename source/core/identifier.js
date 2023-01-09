const { bookList } = require('./bookList');

function identifier(reference) {
  const [_, book, chapter, verse] = parseReference(reference);
  const bookNumber = bookList.indexOf(book);
  if (bookNumber <= 0) {
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

module.exports = { identifier };
