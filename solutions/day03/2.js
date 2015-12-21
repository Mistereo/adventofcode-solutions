/*
--- Part Two ---

The next year, to speed up the process, Santa creates a robot version of
himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the
same starting house), then take turns moving based on instructions from the elf,
who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:
 - ^v delivers presents to 3 houses, because Santa goes north, and then
   Robo-Santa goes south.
 - ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
   where they started.
 - ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction
   and Robo-Santa going the other.
 */

function id(x, y) {
  return x * 1000 + y;
}

const directions = "^>v<";
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

export default function solution(input) {
  const used = {};

  let houseCount = 1;
  const santa = { x: 0, y: 0 };
  const roboSanta = { x: 0, y: 0 };

  used[id(0, 0)] = true;
  input.split('')
    .forEach((c, i) => {
      const dir = directions.indexOf(c);
      if (dir === -1) return;

      let index;
      if (i % 2 === 0) {
        santa.x += dx[dir];
        santa.y += dy[dir];
        index = id(santa.x, santa.y);
      } else {
        roboSanta.x += dx[dir];
        roboSanta.y += dy[dir];
        index = id(roboSanta.x, roboSanta.y);
      }

      if (!used[index]) {
        used[index] = true;
        houseCount++;
      }
    })

  return houseCount;
};
