/*
--- Part Two ---

Now find one that starts with six zeroes.
 */

import crypto from 'crypto';

export default function solution(input) {
  const secret = input.trim();

  let answer = 1;
  while (true) {
    const hash = crypto.createHash('md5')
      .update(secret + answer)
      .digest('hex');

    if (hash.indexOf('000000') === 0) {
      break;
    }
    answer++;
  }

  return answer;
};
