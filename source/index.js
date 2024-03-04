const { identifier, reference } = require('./core/identifier');
const { jump } = require('./core/jump');
const { tokenize } = require('./search/tokenize');
const shortIdentifier = require('./core/shortIdentifier');
const searchIndex = require('../search-index/webp.json');

module.exports = { reference, identifier, jump, shortIdentifier, tokenizeForSearch: tokenize, searchIndex };
