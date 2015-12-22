/*
--- Part Two ---

In all the commotion, you realize that you forgot to seat yourself. At this
point, you're pretty apathetic toward the whole thing, and your happiness
wouldn't really go up or down regardless of who you sit next to. You assume
everyone else would be just as ambivalent about sitting next to you, too.

So, add yourself to the list, and give all happiness relationships that involve
you a score of 0.

What is the total change in happiness for the optimal seating arrangement that
actually includes yourself?
 */

const ME = 'ME';

export default function solution(input) {
  const G = {};
  const used = {};

  function addEdge(from, to, cost) {
    G[from] = G[from] || {};
    G[from][to] = cost;
  }

  input.trim()
    .split('\n')
    .forEach(line => {
      const parts = line.split(' ');
      const from = parts[0];
      const to = parts[10].substring(0, parts[10].length - 1);
      let cost = parseInt(parts[3]);

      if (parts[2] === 'lose') {
        cost = -cost;
      }
      addEdge(from, to, cost);
    });

  const names = Object.keys(G);

  names.forEach(name => {
    addEdge(name, ME, 0);
    addEdge(ME, name, 0);
  });

  const start = names[0];
  let answer = -Infinity;

  function calc(v, total = 0) {
    used[v] = true;
    let allUsed = true;
    const possibleNeighbors = Object.keys(G[v]);
    for (let i = 0; i < possibleNeighbors.length; i++) {
      const to = possibleNeighbors[i];
      if (!used[to]) {
        allUsed = false;
        const cost = G[v][to] + G[to][v];
        calc(to, total + cost);
      }
    }
    if (allUsed) {
      const cost = G[start][v] + G[v][start];
      answer = Math.max(answer, total + cost);
    }
    used[v] = false;
  }

  calc(start);
  return answer;
};
