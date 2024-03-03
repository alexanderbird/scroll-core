import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('splits a verse into tokens', () => {
    const actual = tokenize("Hé will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more. The first things have passed away.”");
    expect(actual).toEqual([
      "he",
      "will",
      "wipe",
      "away",
      "everi",
      "tear",
      "from",
      "their",
      "eye",
      "death",
      "will",
      "be",
      "no",
      "more",
      "neither",
      "will",
      "there",
      "be",
      "mourn",
      "nor",
      "cri",
      "nor",
      "pain",
      "ani",
      "more",
      "first",
      "thing",
      "have",
      "pass",
      "away",
    ]);
  });
});
