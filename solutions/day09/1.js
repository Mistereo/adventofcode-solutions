/*
--- Day 9: All in a Single Night ---

Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided
him the distances between every pair of locations. He can start and end at any
two (different) locations he wants, but he must visit each location exactly
once. What is the shortest distance he can travel to achieve this?

For example, given the following distances:
 - London to Dublin = 464
 - London to Belfast = 518
 - Dublin to Belfast = 141

The possible routes are therefore:
 - Dublin -> London -> Belfast = 982
 - London -> Dublin -> Belfast = 605
 - London -> Belfast -> Dublin = 659
 - Dublin -> Belfast -> London = 659
 - Belfast -> Dublin -> London = 605
 - Belfast -> London -> Dublin = 982

The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is
605 in this example.

What is the distance of the shortest route?
 */

export default function solution(input) {
  const ids = {};
  const G = [];
  const used = {};

  let answer = Infinity;
  function brute(v = 0, cost = 0) {
    used[v] = true;
    let allUsed = true;
    for (let i = 0; i < G[v].length; i++) {
      const [to, c] = G[v][i];
      if (!used[to]) {
        allUsed = false;
        brute(to, cost + c);
      }
    }
    if (allUsed) {
      answer = Math.min(answer, cost);
    }
    used[v] = false;
  }

  function id(city) {
    if (typeof ids[city] === 'undefined') {
      ids[city] = G.length;
      G.push([]);
    }
    return ids[city];
  }

  input.split('\n')
    .map(line => line.trim())
    .filter(line => line.length)
    .forEach(line => {
      const [from, , to, , c] = line.split(' ');
      const cost = parseInt(c);
      const a = id(from);
      const b = id(to);
      G[a].push([b, cost]);
      G[b].push([a, cost]);
    });

  for (let i = 0; i < G.length; i++) {
    brute(i);
  }

  return answer;
};
