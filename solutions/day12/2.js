/*
--- Part Two ---

Uh oh - the Accounting-Elves have realized that they double-counted everything
red.

Ignore any object (and all of its children) which has any property with the
value "red". Do this only for objects ({...}), not arrays ([...]).
 - [1,2,3] still has a sum of 6.
 - [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is
   ignored.
 - {"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire
   structure is ignored.
 - [1,"red",5] has a sum of 6, because "red" in an array has no effect.
 */

export default function solution(input) {
  const parsed = JSON.parse(input);
  let answer = 0;

  function walk(root) {
    if (typeof root === 'number') {
      answer += root;
    }

    if (typeof root !== 'object') return;

    const keys = Object.keys(root);
    if (Array.isArray(root) || keys.every(key => root[key] !== 'red')) {
      keys.forEach(key => walk(root[key]));
    }
  }
  walk(parsed);

  return answer;
};
