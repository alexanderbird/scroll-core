const { Searcher } = require('fast-fuzzy');
const { bookList } = require('./bookList');
const { identifier } = require('./identifier');

const bookNames = Object.keys(bookList);
const fuzzySearcher = new Searcher(bookNames, {
  returnMatchData: true
});

function jump(query) {
  if (query.match(/^[A-Z]\d+$/)) {
    if (query[0] === "G" || query[0] === "H") {
      return { type: 'word', id: query };
    }
    return { type: 'nothing' };
  }
  const refereneMatch = query.match(/^(?<book>\d?[^\d]*)( (?<chapter>\d+)([^0-9](?<verse>\d+)?)?)?$/);
  if (!refereneMatch) {
    return { type: 'nothing' };
  }
  const { book: bookWithWhitespace, chapter: nullableChapter, verse: nullableVerse } = refereneMatch.groups;
  const book = bookWithWhitespace.trim();
  const chapter = nullableChapter || '1';
  const verse = nullableVerse || '1';

  const assembleResponse = bookName => {
    const reference = `${bookName} ${chapter}:${verse}`;
    return {
      type: 'verse',
      id: identifier(reference),
      label: reference
    };
  }

  const fuzzyPattern = new RegExp(book.toLowerCase().split('').join(".*"), 'i');

  const containsAllLetters = bookNames
    .filter(candidate => candidate.match(fuzzyPattern))
    .map(assembleResponse);
  if (containsAllLetters.length === 1) {
    return containsAllLetters[0];
  }
  if (containsAllLetters.length) {
    return { type: 'list', items: containsAllLetters };
  }

  const fuzzyMatches = fuzzySearcher.search(book);

  const similarBookResults = fuzzyMatches.map(x => x.item).map(assembleResponse);
  if (similarBookResults.length === 1) {
    return similarBookResults[0];
  }
  if (similarBookResults.length) {
    return { type: 'list', items: similarBookResults };
  }

  return { type: 'nothing' };
}

module.exports = { jump };
