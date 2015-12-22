/*
--- Part Two ---

The Elves decide they don't want to visit an infinite number of houses. Instead,
each Elf will stop after delivering presents to 50 houses. To make up for it,
they decide to deliver presents equal to eleven times their number at each
house.

With these changes, what is the new lowest house number of the house to get at
least as many presents as the number in your puzzle input?
 */

const MULTIPLIER = 11;
const HOUSES_LIMIT = 50;

function countPresents(house, primes) {
  let n = house;
  let presents = 1;

  for (let i = 0; i < primes.length && primes[i] * primes[i] <= n; i++) {
    const p = primes[i];
    let a = 0;
    while (n % p === 0) {
      n /= p;
      a++;
    }
    presents *= (Math.pow(p, a + 1) - 1) / (p - 1);
  }

  if (n !== 1) {
    presents *= (Math.pow(n, 2) - 1) / (n - 1);
  }

  let t = 1;
  while (house / t > HOUSES_LIMIT) {
    if (house % t === 0) {
      presents -= t;
    }
    t++;
  }

  return presents * MULTIPLIER;
}

function sieve(n) {
  let pr = [];
  let lp = Array(n + 1);

  for (let i = 2; i <= n; i++) {
    if (!lp[i]) {
      lp[i] = i;
      pr.push(i);
    }
    for (let j = 0; j < pr.length && pr[j] <= lp[i] && i * pr[j] <= n; j++) {
      lp[i * pr[j]] = pr[j];
    }
  }

  return pr;
}

export default function solution(input) {
  const n = Number(input.trim());
  const primes = sieve(Math.ceil(Math.sqrt(n / MULTIPLIER)));

  let answer = 1;
  while (countPresents(answer, primes) < n) {
    answer++;
  }

  return answer;
};
