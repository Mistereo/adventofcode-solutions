/*
--- Part Two ---

You just finish implementing your winning light pattern when you realize you
mistranslated Santa's message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each
light can have a brightness of zero or more. The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of
those lights by 1.

The phrase turn off actually means that you should decrease the brightness of
those lights by 1, to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of
those lights by 2.

What is the total brightness of all lights combined after following Santa's
instructions?

For example:
 - turn on 0,0 through 0,0 would increase the total brightness by 1.
 - toggle 0,0 through 999,999 would increase the total brightness by 2000000.
 */

 const WIDTH  = 1000;
 const HEIGHT = 1000;

 function id(x, y) {
   return x + y * WIDTH;
 }

 function parseCoord(str) {
   let [x, y] = str.split(',').map(Number);
   return { x, y };
 }

 export default function solution(input) {
   const lights = [];
   for (let i = 0; i < WIDTH * HEIGHT; i++) {
     lights.push(0);
   }
   input.split('\n')
    .map(line => line.trim().split(' '))
    .filter(data => data.length > 3)
    .forEach(data => {
      if (data.length === 5) {
        data.shift();
      }
      const op = data[0];
      const from = parseCoord(data[1]);
      const to = parseCoord(data[3]);

      const minX = Math.min(from.x, to.x);
      const minY = Math.min(from.y, to.y);

      const maxX = Math.max(from.x, to.x);
      const maxY = Math.max(from.y, to.y);

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          const index = id(x, y);
          switch (op) {
            case 'toggle':
              lights[index] += 2;
              break;
            case 'on':
              lights[index] += 1;
              break;
            case 'off':
              lights[index] = Math.max(0, lights[index] - 1);
              break;
            default:
              break;
          }
        }
      }
    });

    return lights.reduce((a, n) => a + n, 0);
 };
