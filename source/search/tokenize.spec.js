import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('splits a verse into tokens', () => {
    const actual = tokenize("Hé will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more. The first things have passed away.”");
    expect(actual).toEqual([
      "wipe",
      "everi",
      "tear",
      "eye",
      "death",
      "more",
      "neither",
      "mourn",
      "nor",
      "cri",
      "nor",
      "pain",
      "ani",
      "more",
      "first",
      "thing",
      "pass",
    ]);
  });

  it('removes all the words that occur in more than 1000 verses', () => {
    const stopWords = "great an live over place give away name know servant make down yahweh our let these therefor like becaus even word or us citi lord may now made if went offer thing go those against also do men father at we befor no came children so her hand into land come hous had there peopl then man day up when israel this king has one were by say as which out not son are but said god their me was from shall on my have yahweh all them be who with him they is it your i his that a for will he in you to and of";
    expect(tokenize(stopWords)).toHaveLength(0);
  });
});
