/*
--- Part Two ---

Seeing how reindeer move in bursts, Santa decides he's not pleased with the old
scoring system.

Instead, at the end of each second, he awards one point to the reindeer
currently in the lead. (If there are multiple reindeer tied for the lead, they
each get one point.) He keeps the traditional 2503 second time limit, of course,
as doing otherwise would be entirely ridiculous.

Given the example reindeer from above, after the first second, Dancer is in the
lead and gets one point. He stays in the lead until several seconds into Comet's
second burst: after the 140th second, Comet pulls into the lead and gets his
first point. Of course, since Dancer had been in the lead for the 139 seconds
before that, he has accumulated 139 points by the 140th second.

After the 1000th second, Dancer has accumulated 689 points, while poor Comet,
our old champion, only has 312. So, with the new scoring system, Dancer would
win (if the race ended at 1000 seconds).

Again given the descriptions of each reindeer (in your puzzle input), after
exactly 2503 seconds, how many points does the winning reindeer have?
 */

const SECONDS = 2503;

export default function solution(input) {
  const reindeers = input.trim()
    .split('\n')
    .map(line => {
      const [speed, duration, rest] = line.match(/[\d]+/g).map(Number);
      return {
        speed, duration, rest,
        score: 0,
        distance: 0
      };
    });

  for (let i = 0; i < SECONDS; i++) {
    let max = 0;
    reindeers.forEach(item => {
      if (i % (item.duration + item.rest) < item.duration) {
        item.distance += item.speed;
      }
      max = Math.max(max, item.distance);
    });
    
    reindeers.forEach(item => {
      if (item.distance === max) {
        item.score++;
      }
    });
  }

  return Math.max.apply(null, reindeers.map(i => i.score));
};
