/*
--- Part Two ---

The unknown benefactor is very thankful for releasi-- er, helping little Jane
Marie with her computer. Definitely not to distract you, what is the value in
register b after the program is finished executing if register a starts as 1
instead?
 */

import BigInteger from 'bignum';

const TARGET = 'b';

export default function solution(input) {
  const registers = {
    a: BigInteger(1),
    b: BigInteger(0)
  };
  let cursor = 0;

  const instructions = {
    hlf(r) {
      registers[r] = registers[r].div(2);
      cursor++;
    },
    tpl(r) {
      registers[r] = registers[r].mul(3);
      cursor++;
    },
    inc(r) {
      registers[r] = registers[r].add(1);
      cursor++;
    },
    jmp(offset) {
      cursor += parseInt(offset);
    },
    jie(r, offset) {
      if (registers[r[0]].mod(2).eq(0)) {
        cursor += parseInt(offset);
      } else {
        cursor++;
      }
    },
    jio(r, offset) {
      if (registers[r[0]].eq(1)) {
        cursor += parseInt(offset);
      } else {
        cursor++;
      }
    }
  };

  const code = input.trim()
    .split('\n')
    .map(line => line.split(' '))
    .map(
      ([name, ...params]) => instructions[name].bind(null, ...params)
    );

  while (0 <= cursor && cursor < code.length) {
    code[cursor]();
  }

  return registers[TARGET].toString();
};
