const { StemmerEn, StopwordsEn } = require('@nlpjs/lang-en');
const wordsToNumbers = require('words-to-numbers').default;

const stopwords = new StopwordsEn();
stopwords.dictionary = {};
stopwords.build("the great an live over place give away name know servant make down yahweh our let these therefor like becaus even word or us citi lord may now made if went offer thing go those against also do men father at we befor no came children so her hand into land come hous had there peopl then man day up when israel this king has one were by say as which out not son are but said god their me was from shall on my have yahweh all them be who with him they is it your i his that a for will he in you to and of".split(' '));

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
