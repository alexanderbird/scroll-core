module.exports = { compress, expand };

class BlockMapping {
  constructor() {
    this.compressionMap = {};
    this.expansionMap = {};
  }

  addBlock(number, size, books) {
    books.forEach((book, i) => {
      this.compressionMap[book] = { book: number, offset: i * size };
    });
    this.expansionMap[number] = { size, books };
    return this;
  }

  compress(book, chapter) {
    try {
      const sanitizedBook = Number(book).toString();
      const block = this.compressionMap[sanitizedBook];
      const compressedChapter = block.offset + Number(chapter);
      return { book: block.book, chapter: compressedChapter };
    } catch(e) {
      throw new Error(`Failed to compress ${JSON.stringify({ book, chapter })}: ${e}`);
    }
  }

  expand(book, chapter) {
    const sanitizedBook = Number(book).toString();
    const chapterNumber = Number(chapter);
    const block = this.expansionMap[sanitizedBook];
    const bookIndex = Math.floor((chapterNumber - 0.1) / block.size);
    const expandedBook = block.books[bookIndex];
    const expandedChapter = ((chapterNumber - 1) % block.size) + 1;
    return { book: expandedBook, chapter: expandedChapter };
  }
}

const blocks = new BlockMapping()
  .addBlock(1, 4, [ 31, 57, 63, 64, 65, 37, 29, 34, 35, 36, 53, 56, 61, 8, 32, 39, 50, 51, 55 ])
  .addBlock(2, 9, [ 25, 52, 59, 60, 62, 48, 49, 54, 33, 22, 30 ])
  .addBlock(3, 13, [ 15, 17, 21, 27, 16, 47, 58 ])
  .addBlock(4, 16, [ 28, 38, 41, 45, 46 ])
  .addBlock(5, 25, [ 7, 43, 11, 66 ])
  .addBlock(6, 25, [ 12, 6, 10, 42 ])
  .addBlock(7, 33, [ 3, 40, 44 ])
  .addBlock(8, 33, [ 13, 9, 20 ])
  .addBlock(9, 49, [ 5, 4 ])
  .addBlock(10, 49, [ 14, 2 ])
  .addBlock(11, 49, [ 18, 26 ])
  .addBlock(12, 99, [ 1 ])
  .addBlock(13, 99, [ 24 ])
  .addBlock(14, 99, [ 23 ])
  .addBlock(15, 99, [ 67 ])
  .addBlock(16, 99, [ 68 ])
  .addBlock(17, 99, [ 69 ]);

function compress({ book, chapter, verse }) {
  const partial = handlePsalmCompression(book, chapter, verse);
  const compressed = blocks.compress(partial.book, partial.chapter);
  return { book: compressed.book, chapter: compressed.chapter, verse: partial.verse };
}

function expand({ book, chapter, verse }) {
  const expanded = blocks.expand(book, chapter);
  return handlePsalmExpansion(expanded.book, expanded.chapter, verse);
}

function handlePsalmCompression(book, chapter, verse) {
  return specialCompressingCases[book]
    ? specialCompressingCases[book](chapter, verse)
    : { book, chapter, verse };
}
function handlePsalmExpansion(book, chapter, verse) {
  return specialExpandingCases[book]
    ? specialExpandingCases[book](chapter, verse)
    : { book, chapter, verse };
}

const specialCompressingCases = {
  [19]: (chapter, verse) => {
    if (chapter > 99 && verse > 99) return { book: 68, chapter: (Number(chapter) - 99).toString(), verse: (Number(verse) - 99).toString() };
    if (chapter > 99) return { book: 67, chapter: (Number(chapter) - 99).toString(), verse};
    return { book: 69, chapter, verse };
  },
}

const specialExpandingCases = {
  '69': (chapter, verse) => ({ book: 19, chapter, verse }),
  '67': (chapter, verse) => ({ book: 19, chapter: 99 + Number(chapter), verse }),
  '68': (chapter, verse) => ({ book: 19, chapter: 99 + Number(chapter), verse: 99 + Number(verse) }),
}

