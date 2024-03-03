const { StemmerEn, StopwordsEn } = require('@nlpjs/lang-en');

const stopwords = new StopwordsEn();
stopwords.dictionary = {};
stopwords.build([
  'the',
  //'and' // TODO
]);

const stemmer = new StemmerEn();
stemmer.stopwords = stopwords;

export function tokenize(text) {
  return stemmer.tokenizeAndStem(text, false)
    .filter(x => x.match(/[a-z]/));
}
