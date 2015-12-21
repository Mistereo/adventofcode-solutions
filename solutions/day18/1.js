/*
--- Day 18: Like a GIF For Your Yard ---

After the million lights incident, the fire code has gotten stricter: now, at
most ten thousand lights are allowed. You arrange them in a 100x100 grid.

Never one to let you down, Santa again mails you instructions on the ideal
lighting configuration. With so few lights, he says, you'll have to resort to
animation.

Start by setting your lights to the included initial configuration (your puzzle
input). A # means "on", and a . means "off".

Then, animate your grid in steps, where each step decides the next configuration
based on the current one. Each light's next state (either on or off) depends on
its current state and the current states of the eight lights adjacent to it
(including diagonals). Lights on the edge of the grid might have fewer than
eight neighbors; the missing ones always count as "off".

For example, in a simplified 6x6 grid, the light marked A has the neighbors
numbered 1 through 8, and the light marked B, which is on an edge, only has the
neighbors marked 1 through 5:

  1B5...
  234...
  ......
  ..123.
  ..8A4.
  ..765.

The state a light should have next is based on its current state (on or off)
plus the number of neighbors that are on:
 - A light which is on stays on when 2 or 3 neighbors are on, and turns off
   otherwise.
 - A light which is off turns on if exactly 3 neighbors are on, and stays off
   otherwise.

All of the lights update simultaneously; they all consider the same current
state before moving to the next.

Here's a few steps from an example configuration of another 6x6 grid:

  Initial state:
  .#.#.#
  ...##.
  #....#
  ..#...
  #.#..#
  ####..

  After 1 step:
  ..##..
  ..##.#
  ...##.
  ......
  #.....
  #.##..

  After 2 steps:
  ..###.
  ......
  ..###.
  ......
  .#....
  .#....

  After 3 steps:
  ...#..
  ......
  ...#..
  ..##..
  ......
  ......

  After 4 steps:
  ......
  ......
  ..##..
  ..##..
  ......
  ......

After 4 steps, this example has four lights on.

In your grid of 100x100 lights, given your initial configuration, how many
lights are on after 100 steps?
 */

const ITERATIONS = 100;
const WIDTH = 100;
const HEIGHT = 100;

const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [1, 1, 0, -1, -1, -1, 0, 1];
const directions = 9;

export default function solution(input) {
  let state = input.trim()
    .split('\n')
    .map(line => line.split('').map(value => value == '#' ? 1 : 0));
  let nextState = [];
  for (let i = 0; i < WIDTH; i++) {
    const line = [];
    for (let j = 0; j < HEIGHT; j++) {
      line.push(0);
    }
    nextState.push(line);
  }

  function inside(x, y) {
    return 0 <= x && x < WIDTH && 0 <= y && y < HEIGHT;
  }

  for (let i = 0; i < ITERATIONS; i++) {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        let lights = 0;
        for (let t = 0; t < directions; t++) {
          if (inside(x + dx[t], y + dy[t])) {
            lights += state[x + dx[t]][y + dy[t]];
          }
        }
        if (lights === 3 || lights === 2 && state[x][y]) {
          nextState[x][y] = 1;
        } else {
          nextState[x][y] = 0;
        }
      }
    }
    [state, nextState] = [nextState, state];
  }

  return state.map(line => line.reduce((a, n) => a + n))
    .reduce((a, n) => a + n);
};
