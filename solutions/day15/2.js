/*
--- Part Two ---

Your cookie recipe becomes wildly popular! Someone asks if you can make another
recipe that has exactly 500 calories per cookie (so they can use it as a meal
replacement). Keep the rest of your award-winning process the same (100
teaspoons, same ingredients, same scoring system).

For example, given the ingredients above, if you had instead selected 40
teaspoons of butterscotch and 60 teaspoons of cinnamon (which still adds to
100), the total calorie count would be 40*8 + 60*3 = 500. The total score would
go down, though: only 57600000, the best you can do in such trying
circumstances.

Given the ingredients in your kitchen and their properties, what is the total
score of the highest-scoring cookie you can make with a calorie total of 500?
 */

const AMOUNT = 100;
const CALORIES = 500;

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

  function calories(ingredients, amounts) {
    return ingredients.map(i => i['calories'])
      .reduce((a, item, key) => a + item * amounts[key], 0);
  }

  const amounts = [];
  for (let i = 0; i < ingredients.length; i++) {
    amounts.push(0);
  }

  let answer = 0;
  function calc(id = 0, amount = AMOUNT) {
    if (amount === 0 && calories(ingredients, amounts) === CALORIES) {
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
