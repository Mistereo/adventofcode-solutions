/*
--- Part Two ---

While playing with all the containers in the kitchen, another load of eggnog
arrives! The shipping and receiving department is requesting as many containers
as you can spare.

Find the minimum number of containers that can exactly fit all 150 liters of
eggnog. How many different ways can you fill that number of containers and still
hold exactly 150 litres?

In the example above, the minimum number of containers was two. There were three
ways to use that many containers, and so the answer there would be 3.
 */

const EGGNOG = 150;

export default function solution(input) {
  const capacities = input.trim()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

  const used = {};

  let answer = 0;
  let minContainersCount = Infinity;
  let ways = 0;
  function calc(x, from = 0) {
    if (x === 0) {
      const containersCount = Object.keys(used)
        .filter(key => used[key])
        .length;
      if (containersCount < minContainersCount) {
        minContainersCount = containersCount;
        ways = 1;
      } else if (containersCount === minContainersCount) {
        ways++;
      }
      answer++;
      return;
    }

    if (x < 0) {
      return;
    }

    for (let i = from; i < capacities.length; i++) {
      if (x - capacities[i] < 0) {
        break;
      }
      if (!used[i]) {
        used[i] = true;
        calc(x - capacities[i], i + 1);
        used[i] = false;
      }
    }
  }

  calc(EGGNOG);
  return ways;
};
