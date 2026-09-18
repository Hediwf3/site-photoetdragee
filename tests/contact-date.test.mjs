import test from 'node:test';
import assert from 'node:assert/strict';
import { formatWeddingDate, weddingDateError } from '../src/utils/contact-date.mjs';

test('formats partial, pasted and complete dates', () => {
  for (const [input, expected] of [['', ''], ['1', '1'], ['140', '14/0'], ['14062027', '14/06/2027'], ['14/06/2027', '14/06/2027'], ['14 juin 06 2027', '14/06/2027']]) {
    assert.equal(formatWeddingDate(input), expected);
  }
});
test('accepts real dates, including leap day', () => {
  for (const value of ['', '14/06/2027', '29/02/2028', '31/12/2027', '01/01/2027']) assert.equal(weddingDateError(value), '');
});
test('rejects impossible and incomplete dates', () => {
  for (const value of ['32/13/2027', '31/04/2027', '29/02/2027', '00/06/2027', '14/00/2027', '14/06/0000', '14/06/27', '2027-06-14']) assert.notEqual(weddingDateError(value), '');
});
