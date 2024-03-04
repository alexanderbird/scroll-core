const fs = require('fs');
const { tokenize } = require('./tokenize');
const shortIdentifier = require('../core/shortIdentifier');
const { identifier } = require('../core/identifier');

const inputJson = fs.readFileSync(process.argv[2], 'utf-8');

const input = JSON.parse(inputJson);

const result = {};

input.forEach(({ reference, text }) => {
  const id = shortIdentifier.compress(identifier(reference));
  const tokens = tokenize(text);
  tokens.forEach(token => {
    result[token] = result[token] || [];
    result[token].push(id);
  });
});

const summary = Object.entries(result)
  .map(([key, value]) => ({ length: value.length, key }))
  .sort((a, b) => a.length - b.length)
  .map(({ key, length }) => `${key}\t${length}`)

//summary.forEach(x => console.log(x));
//
console.log(JSON.stringify(result))
