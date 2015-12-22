/*
--- Part Two ---

Now, take the signal you got on wire a, override wire b to that signal, and
reset the other wires (including wire a). What new signal is ultimately provided
to wire a?
 */

const MASK = 0xFFFF;
const IDENT = /^[a-z]+$/;
const NUMERIC = /^\d+$/;

const DEST = 'a';

const gates = {
  'AND': (a, b) => a & b,
  'OR': (a, b) => a | b,
  'NOT': (x) => ~x & MASK,
  'RSHIFT': (x, t) => x >> t & MASK,
  'LSHIFT': (x, t) => x << t & MASK
};

export default function solution(input) {
  const exprs = input.trim()
    .split('\n')
    .map(line => line.trim().split(' '))
    .reduce((a, parts) => {
      const ident = parts[parts.length - 1];
      a[ident] = parts;
      return a;
    }, {});

  let cache = {};
  function calc(register) {
    if (NUMERIC.test(register)) {
      return parseInt(register);
    }

    if (cache.hasOwnProperty(register)) {
      return cache[register];
    }

    const parts = exprs[register];
    let result;
    if (parts.length === 3) {
      const [a, , key] = parts;
      result = calc(a);
    }

    if (parts.length === 4) {
      const [op, x, , key] = parts;
      result = gates[op](calc(x));
    }

    if (parts.length === 5) {
      const [a, op, b, , key] = parts;
      result = gates[op](calc(a), calc(b));
    }

    cache[register] = result;
    return result;
  }

  const value = calc(DEST);
  exprs['b'] = [value, '->', 'b'];
  cache = {};
  return calc(DEST);
};
