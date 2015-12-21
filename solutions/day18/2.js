/*
--- Part Two ---

You flip the instructions over; Santa goes on to point out that this is all just
an implementation of Conway's Game of Life. At least, it was, until you notice
that something's wrong with the grid of lights you bought: four lights, one in
each corner, are stuck on and can't be turned off. The example above will
actually run like this:

  Initial state:
  ##.#.#
  ...##.
  #....#
  ..#...
  #.#..#
  ####.#

  After 1 step:
  #.##.#
  ####.#
  ...##.
  ......
  #...#.
  #.####

  After 2 steps:
  #..#.#
  #....#
  .#.##.
  ...##.
  .#..##
  ##.###

  After 3 steps:
  #...##
  ####.#
  ..##.#
  ......
  ##....
  ####.#

  After 4 steps:
  #.####
  #....#
  ...#..
  .##...
  #.....
  #.#..#

  After 5 steps:
  ##.###
  .##..#
  .##...
  .##...
  #.#...
  ##...#

After 5 steps, this example now has 17 lights on.

In your grid of 100x100 lights, given your initial configuration, but with the
four corners always in the on state, how many lights are on after 100 steps?
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
    nextState[0][0] = 1;
    nextState[0][HEIGHT - 1] = 1;
    nextState[WIDTH - 1][0] = 1;
    nextState[WIDTH - 1][HEIGHT - 1] = 1;
    [state, nextState] = [nextState, state];
  }

  return state.map(line => line.reduce((a, n) => a + n))
    .reduce((a, n) => a + n);
};
