/*
--- Day 6: Probably a Fire Hazard ---

Because your neighbors keep defeating you in the holiday house decorating
contest year after year, you've decided to deploy one million lights in a
1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you
instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at
each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include
whether to turn on, turn off, or toggle various inclusive ranges given as
coordinate pairs. Each coordinate pair represents opposite corners of a
rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to
9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by
doing the instructions Santa sent you in order.

For example:
 - turn on 0,0 through 999,999 would turn on (or leave on) every light.
 - toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning
   off the ones that were on, and turning on the ones that were off.
 - turn off 499,499 through 500,500 would turn off (or leave off) the middle
   four lights.

After following the instructions, how many lights are lit?
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
    lights.push(false);
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
             lights[index] = !lights[index];
             break;
           case 'on':
             lights[index] = true;
             break;
           case 'off':
             lights[index] = false;
             break;
           default:
             break;
         }
       }
     }
   });

   return lights.filter(Boolean).length;
};
