require("babel-polyfill");
require("babel-register");

var fs = require('fs');
var path = require('path');


var argv = require('yargs')
  .alias('d', 'day')
  .alias('p', 'part')
  .alias('i', 'input')
  .default('d', 1)
  .default('p', 1)
  .argv;

var day = ("0" + argv.day).substr(-2);
var solutionsPath = path.resolve(__dirname, 'solutions');
var inputFile = path.resolve(solutionsPath, 'day' + day, 'input.txt');
var solutionFile = path.resolve(solutionsPath, 'day' + day, argv.part + '.js');

var input = argv.input || fs.readFileSync(inputFile).toString();
var solution = require(solutionFile).default;

console.log(solution(input));
