/*
--- Part Two ---

Santa's password expired again. What's the next one?
 */

import nextPassword from './1.js';

export default function solution(input) {
  return nextPassword(nextPassword(input));
};
