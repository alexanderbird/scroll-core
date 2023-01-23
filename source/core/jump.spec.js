import { jump } from './jump';

describe('jump', () => {
  Object.entries({
    'H123':         { type: 'word', id: 'H123' },
    'G123':         { type: 'word', id: 'G123' },
    'h123':         { type: 'word', id: 'H123' },
    'g123':         { type: 'word', id: 'G123' },
    'F123':         { type: 'nothing' },
    '12 Genesis':   { type: 'nothing' },
    'Genesis 2:31': { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Genesis 2':    { type: 'verse', id: '01-002-001', label: 'Genesis 2:1' },
    'Gen 2:31':     { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Gen. 2:31':    { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'gEn. 2:31':    { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Gen 2/31':     { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Genesis 2.31': { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Gen 2.31':     { type: 'verse', id: '01-002-031', label: 'Genesis 2:31' },
    'Gen 2':        { type: 'verse', id: '01-002-001', label: 'Genesis 2:1' },
    'Gen':          { type: 'verse', id: '01-001-001', label: 'Genesis 1:1' },
    'Genesis':      { type: 'verse', id: '01-001-001', label: 'Genesis 1:1' },
    'Job':          { type: 'verse', id: '18-001-001', label: 'Job 1:1' },
    'job':          { type: 'verse', id: '18-001-001', label: 'Job 1:1' },
    'Psalm 1:1':    { type: 'verse', id: '19-001-001', label: 'Psalms 1:1' },
    'Song of Solomon 1:1':    { type: 'verse', id: '22-001-001', label: 'Song of Songs 1:1' },
    'John': { type: 'list', items: [
      { type: 'verse', id: '43-001-001', label: 'John 1:1' },
      { type: 'verse', id: '62-001-001', label: '1 John 1:1' },
      { type: 'verse', id: '63-001-001', label: '2 John 1:1' },
      { type: 'verse', id: '64-001-001', label: '3 John 1:1' }
    ] },
    'Jhn': { type: 'list', items: [
      { type: 'verse', id: '43-001-001', label: 'John 1:1' },
      { type: 'verse', id: '62-001-001', label: '1 John 1:1' },
      { type: 'verse', id: '63-001-001', label: '2 John 1:1' },
      { type: 'verse', id: '64-001-001', label: '3 John 1:1' }
    ] },
    'Jn': { type: 'list', items: [
      { type: 'verse', id: '32-001-001', label: 'Jonah 1:1' },
      { type: 'verse', id: '43-001-001', label: 'John 1:1' },
      { type: 'verse', id: '62-001-001', label: '1 John 1:1' },
      { type: 'verse', id: '63-001-001', label: '2 John 1:1' },
      { type: 'verse', id: '64-001-001', label: '3 John 1:1' }
    ] },
    'Jhon': { type: 'list', items: [
      { type: 'verse', id: '43-001-001', label: 'John 1:1' },
      { type: 'verse', id: '32-001-001', label: 'Jonah 1:1' },
      { type: 'verse', id: '62-001-001', label: '1 John 1:1' },
      { type: 'verse', id: '63-001-001', label: '2 John 1:1' },
      { type: 'verse', id: '64-001-001', label: '3 John 1:1' }
    ] },
    'Philippians 4:2':  { type: 'verse', id: '50-004-002', label: 'Philippians 4:2' },
    'Phillipians 4:2':  { type: 'verse', id: '50-004-002', label: 'Philippians 4:2' },
    'Phil 4:2':         { type: 'list', items: [
      { type: 'verse', id: '50-004-002', label: 'Philippians 4:2' },
      { type: 'verse', id: '57-004-002', label: 'Philemon 4:2' }
    ] },
    'So Not Related To Any Book':  { type: 'nothing' },
  }).forEach(([from, to]) => {
    it(`converts from ${from} to ${JSON.stringify(to)}`, () => {
      expect(jump(from)).toEqual(to);
    });
  });
});
