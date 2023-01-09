import { bookList } from './bookList';

export function identifier(reference) {
  const [_, book, chapter, verse] = parseReference(reference);
  return [
    bookList.indexOf(book),
    chapter,
    verse,
  ].join('-');
}

function parseReference(reference) {
  const pattern = /(.*) (\d+):(\d+)/;
  const match = reference.match(pattern);
  if (!match) {
    throw new Error(`Failed to parse "${reference}". Expected it to match ${pattern}, but id did not.`);
  }
  return match;
}
