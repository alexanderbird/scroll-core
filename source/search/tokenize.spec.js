import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('splits a verse into tokens', () => {
    const actual = tokenize("“Hé will wipe away every tear’ from their eyes. Death ‘will be no more; neither will there be mourning, nor crying, nor pain any more. The first — things have passed away.”");
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
      "pain",
      "ani",
      "1",
      "thing",
      "pass",
    ]);
  });

  it('removes all the words that occur in more than 1000 verses', () => {
    const stopWords = "a an over place away name know make down our let these therefor like becaus even or us may now made if went thing go those also do men at we befor no came so her into land hous had there then man day up when this has were by say as which out not son are but said their me was from shall on my have all them be who with him they is it your i his that for will he in you to and of what did";
    expect(tokenize(stopWords)).toHaveLength(0);
  });

  it('treats hyphens as spaces', () => {
    const one = tokenize('my mother in law has a lovely hat');
    const two = tokenize('mother-in-law has-a-lovely hat');
    expect(one).toEqual(two);
  });

  it('understands numbers', () => {
    const phraseWithNumbers = 'There are forty two fish on the fifth train car in the seventy-third box';
    expect(tokenize(phraseWithNumbers)).toEqual([
      '42',
      'fish',
      '5',
      'train',
      'car',
      '73',
      'box'
    ]);
  });

  it('removes duplicates', () => {
    expect(tokenize('Spam, egg, Spam, Spam, bacon, and Spam')).toEqual([
      'spam',
      'egg',
      'bacon'
    ]);
  });

  it('tokenizes the word "point" correctly', () => {
    expect(tokenize("The pencil's point snapped. What's the point?")).toEqual([
      'pencil',
      'point',
      'snap',
    ]);
  });

  it('stems similar words', () => {
    expect(tokenize('trust, trusted, trusting')).toEqual(['trust']);
  });

});
