/*
--- Day 7: Some Assembly Required ---

This year, Santa brought little Bobby Tables a set of wires and bitwise logic
gates! Unfortunately, little Bobby is a little under the recommended age range,
and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit
signal (a number from 0 to 65535). A signal is provided to each wire by a gate,
another wire, or some specific value. Each wire can only get a signal from one
source, but can provide its signal to multiple destinations. A gate provides no
signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together:
x AND y -> z means to connect wires x and y to an AND gate, and then connect its
output to wire z.

For example:
 - 123 -> x means that the signal 123 is provided to wire x.
 - x AND y -> z means that the bitwise AND of wire x and wire y is provided to
   wire z.
 - p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and
   then provided to wire q.
 - NOT e -> f means that the bitwise complement of the value from wire e is
   provided to wire f.

Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for
some reason, you'd like to emulate the circuit instead, almost all programming
languages (for example, C, JavaScript, or Python) provide operators for these
gates.

For example, here is a simple circuit:
  123 -> x
  456 -> y
  x AND y -> d
  x OR y -> e
  x LSHIFT 2 -> f
  y RSHIFT 2 -> g
  NOT x -> h
  NOT y -> i

After it is run, these are the signals on the wires:
  d: 72
  e: 507
  f: 492
  g: 114
  h: 65412
  i: 65079
  x: 123
  y: 456

In little Bobby's kit's instructions booklet (provided as your puzzle input),
what signal is ultimately provided to wire a?
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

  const cache = {};
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

  return calc(DEST);
};
