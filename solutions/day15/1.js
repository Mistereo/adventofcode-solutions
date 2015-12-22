/*
--- Day 15: Science for Hungry People ---

Today, you set out on the task of perfecting your milk-dunking cookie recipe.
All you have to do is find the right balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients. You make a
list of the remaining ingredients you could use to finish the recipe (your
puzzle input) and their properties per teaspoon:

capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)
You can only measure ingredients in whole-teaspoon amounts accurately, and you
have to be accurate so you can reproduce your results in the future. The total
score of a cookie can be found by adding up each of the properties (negative
totals become 0) and then multiplying together everything except calories.

For instance, suppose you have these two ingredients:
  Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
  Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3

Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of cinnamon
(because the amounts of each ingredient must add up to 100) would result in a
cookie with the following properties:
 - A capacity of 44*-1 + 56*2 = 68
 - A durability of 44*-2 + 56*3 = 80
 - A flavor of 44*6 + 56*-2 = 152
 - A texture of 44*3 + 56*-1 = 76

Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now)
results in a total score of 62842880, which happens to be the best score
possible given these ingredients. If any properties had produced a negative
total, it would have instead become zero, causing the whole score to multiply
to zero.

Given the ingredients in your kitchen and their properties, what is the total
score of the highest-scoring cookie you can make?
 */

const AMOUNT = 100;

export default function solution(input) {
  const ingredients = input.trim()
    .split('\n')
    .map(line => line.split(':').map(i => i.trim()))
    .map(([title, params]) => {
      return params.split(',')
        .map(i => i.trim().split(' '))
        .reduce((a, i) => {
          a[i[0]] = parseInt(i[1]);
          return a;
        }, {});
    });

  function score(ingredients, amounts) {
    const all = ingredients
      .reduce((a, item, i) => {
        Object.keys(item).forEach(key => {
          a[key] = a[key] || 0;
          a[key] += item[key] * amounts[i];
        });
        return a;
      }, {});

    return Object.keys(all)
      .reduce((a, key) => {
        if (key === 'calories') {
          return a;
        }

        return a * Math.max(0, all[key]);
      }, 1);
  }

  const amounts = [];
  for (let i = 0; i < ingredients.length; i++) {
    amounts.push(0);
  }

  let answer = 0;
  function calc(id = 0, amount = AMOUNT) {
    if (amount === 0) {
      answer = Math.max(answer, score(ingredients, amounts));
    } else if (id < ingredients.length) {
      for (let i = 0; i <= amount; i++) {
        amounts[id] = i;
        calc(id + 1, amount - i);
      }
    }

    return answer;
  }

  return calc();
};
