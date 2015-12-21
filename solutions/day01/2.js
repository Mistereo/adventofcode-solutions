/*
--- Part Two ---

Now, given the same instructions, find the position of the first character that
causes him to enter the basement (floor -1). The first character in the
instructions has position 1, the second character has position 2, and so on.

For example:
 - ) causes him to enter the basement at character position 1.
 - ()()) causes him to enter the basement at character position 5.

What is the position of the character that causes Santa to first enter the
basement?
 */

const BASEMENT = -1;

export default function solution(input) {
  let floor = 0;
  let position = -1;

  input.split('').some((c, i) => {
   if (c === '(') floor++;
   if (c === ')') floor--;

   if (floor === BASEMENT) position = i;

   return floor === BASEMENT;
  });

  return position + 1;
};
