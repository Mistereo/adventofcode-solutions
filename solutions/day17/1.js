/*
--- Day 17: No Such Thing as Too Much ---

The elves bought too much eggnog again - 150 liters this time. To fit it all
into your refrigerator, you'll need to move it into smaller containers. You take
an inventory of the capacities of the available containers.

For example, suppose you have containers of size 20, 15, 10, 5, and 5 liters. If
you need to store 25 liters, there are four ways to do it:
 - 15 and 10
 - 20 and 5 (the first 5)
 - 20 and 5 (the second 5)
 - 15, 5, and 5

Filling all containers entirely, how many different combinations of containers
can exactly fit all 150 liters of eggnog?
 */

const EGGNOG = 150;

export default function solution(input) {
  const capacities = input.trim()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

  const used = {};

  let answer = 0;
  function calc(x, from = 0) {
    if (x === 0) {
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
  return answer;
};
