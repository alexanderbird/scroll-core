const { StemmerEn, StopwordsEn } = require('@nlpjs/lang-en');
const wordsToNumbers = require('words-to-numbers').default;
const stopWords = require('./stopWords.json');

const stopwords = new StopwordsEn();
stopwords.dictionary = {};
stopwords.build(stopWords);

const stemmer = new StemmerEn();
stemmer.stopwords = stopwords;

export function tokenize(text) {
  const preprocessed = convertWordsToNumbers(text.toLowerCase())
    .replace(/[—-]/g, ' ')
    .replace(/‘/g, "'")
    .replace(/’/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"');
  return unique(stemmer.tokenizeAndStem(preprocessed, false));
}

function unique(words) {
  return Array.from(new Set(words));
}

function convertWordsToNumbers(text) {
  const preprocessed = text
    .replace(/\bpoint\b/g, 'PUT_ME_BACK_LATER_point')
    .replace(/\ba\b/g, 'PUT_ME_BACK_LATER_a');
  const withNumbers = wordsToNumbers(preprocessed);
  return withNumbers.replace(/PUT_ME_BACK_LATER_(\w+)/g, '$1');
}
