/*
--- Part Two ---

As you're about to send the thank you note, something in the MFCSAM's
instructions catches your eye. Apparently, it has an outdated retroencabulator,
and so the output from the machine isn't exact values - some of them indicate
ranges.

In particular, the cats and trees readings indicates that there are greater than
that many (due to the unpredictable nuclear decay of cat dander and tree
pollen), while the pomeranians and goldfish readings indicate that there are
fewer than that many (due to the modial interaction of magnetoreluctance).

What is the number of the real Aunt Sue?
 */

const MFCSAM_RESULT = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

const greaterFields = ['cats', 'trees'];
const fewerFields = ['pomeranians', 'goldfish'];

export default function soltion(input) {
  return input.trim()
    .split('\n')
    .map(line => {
      const [, id, items] = line.match(/Sue (\d+): (.*)/);
      const signs = {};
      items.split(',')
        .forEach(sign => {
          const [key, value] = sign.split(':').map(i => i.trim());
          signs[key] = Number(value);
        });
      return { id, signs };
    })
    .filter(item => {
      const signs = item.signs;
      const a = greaterFields.filter(key => signs.hasOwnProperty(key))
        .every(key => signs[key] > MFCSAM_RESULT[key]);
      const b = fewerFields.filter(key => signs.hasOwnProperty(key))
        .every(key => signs[key] < MFCSAM_RESULT[key]);
      return a && b;
    })
    .reduce((a, i) => {
      const signs = i.signs;
      const keys = Object.keys(signs);
      if (keys.every(key => {
        if (fewerFields.includes(key) || greaterFields.includes(key)) {
          return true;
        }
        return signs[key] == MFCSAM_RESULT[key]
      })) {
        return i.id;
      }
      return a;
    });
};
