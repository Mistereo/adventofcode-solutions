/*
--- Part Two ---

Neat, right? You might also enjoy hearing John Conway talking about this
sequence (that's Conway of Conway's Game of Life fame).

Now, starting again with the digits in your puzzle input, apply this process 50
times. What is the length of the new result?
 */

const TIMES = 50;

function rle(str) {
 let count = 1;
 let symbol = str[0];
 let answer = "";
 for (let i = 1; i < str.length; i++) {
   if (str[i] === symbol) {
     count++;
   } else {
     answer += count + symbol;
     count = 1;
     symbol = str[i];
   }
 }
 answer += count + symbol;
 return answer;
}

export default function solution(input) {
 let answer = input.trim();
 for (let i = 0; i < TIMES; i++) {
   answer = rle(answer);
 }

 return answer.length;
};
