/*
--- Day 5: Doesn't He Have Intern-Elves For This? ---

Santa needs help figuring out which strings in his text file are naughty or
nice.

A nice string is one with all of the following properties:
 - It contains at least three vowels (aeiou only), like aei, xazegov, or
   aeiouaeiouaeiou.
 - It contains at least one letter that appears twice in a row, like xx,
   abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
 - It does not contain the strings ab, cd, pq, or xy, even if they are part of
   one of the other requirements.

For example:
 - ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...),
   a double letter (...dd...), and none of the disallowed substrings.
 - aaa is nice because it has at least three vowels and a double letter, even
   though the letters used by different rules overlap.
 - jchzalrnumimnmhp is naughty because it has no double letter.
 - haegwjzuvuyypxyu is naughty because it contains the string xy.
 - dvszwmarrgswjxmb is naughty because it contains only one vowel.

How many strings are nice?
 */

const VOWELS_REQUIRED = 3;
const DISALLOWED_STRINGS = ['ab', 'cd', 'pq', 'xy'];

function isVowel(c) {
  return /^[aeiou]$/.test(c);
}

function isNice(str) {
  let vowels = 0;
  let twice = false;
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      vowels++;
    }
    if (i + 1 < str.length && str[i] === str[i + 1]) {
      twice = true;
    }
  }

  return twice &&
         vowels >= VOWELS_REQUIRED &&
         DISALLOWED_STRINGS.every(bad => str.indexOf(bad) === -1);
}

export default function solution(input) {
  return input.split('\n')
    .reduce((a, str) => isNice(str) ? a + 1 : a, 0);
};
