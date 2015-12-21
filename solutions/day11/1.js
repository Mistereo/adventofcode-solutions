/*
--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has
devised a method of coming up with a password based on the previous one.
Corporate policy dictates that passwords must be exactly eight lowercase letters
(for security reasons), so he finds his new password by incrementing his old
password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on.
Increase the rightmost letter one step; if it was z, it wraps around to a, and
repeat with the next letter to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed
some additional password requirements:
 - Passwords must include one increasing straight of at least three letters,
   like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd
   doesn't count.
 - Passwords may not contain the letters i, o, or l, as these letters can be
   mistaken for other characters and are therefore confusing.
 - Passwords must contain at least two different, non-overlapping pairs of
   letters, like aa, bb, or zz.

For example:
 - hijklmmn meets the first requirement (because it contains the straight hij)
   but fails the second requirement requirement (because it contains i and l).
 - abbceffg meets the third requirement (because it repeats bb and ff) but fails
   the first requirement.
 - abbcegjk fails the third requirement, because it only has one double letter
   (bb).
 - The next password after abcdefgh is abcdffaa.
 - The next password after ghijklmn is ghjaabcc, because you eventually skip all
   the passwords that start with ghi..., since i is not allowed.

Given Santa's current password (your puzzle input), what should his next
password be?
 */

const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DISALLOWED = "iol";

function nextPossible(password) {
  const parts = password.split('');

  function increment(position) {
    const value = parts[position];
    if (value === 'z' && position != 0) {
      parts[position] = 'a';
      return increment(position - 1);
    }
    const index = ALPHA.indexOf(value);
    parts[position] = ALPHA[index + 1];
  }

  increment(parts.length - 1);

  return parts.join('');
}

function isGood(password) {
  for (let i = 0; i < DISALLOWED.length; i++) {
    if (password.includes(DISALLOWED[i])) {
      return false;
    }
  }

  let pairsCount = 0;
  for (let i = 0; i < ALPHA.length; i++) {
    const pair = ALPHA[i] + ALPHA[i];
    if (password.includes(pair)) {
      pairsCount++;
    }
  }

  if (pairsCount < 2) {
    return false;
  }

  for (let i = 0; i < ALPHA.length - 2; i++) {
    const triplet = ALPHA.substr(i, 3);
    if (password.includes(triplet)) {
      return true;
    }
  }

  return false;
}

export default function solution(input) {
  const password = input.trim();

  let answer = password;
  do {
    answer = nextPossible(answer);
  } while (!isGood(answer));

  return answer;
};
