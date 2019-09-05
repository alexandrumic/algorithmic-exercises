'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getPairs(list) {
  if (list.length < 2) { return []; }

  const first = list[0],
    rest = list.slice(1),
    pairs = rest.map(function (item) {
      return [first, item];
    });

  return pairs.concat(getPairs(rest));
}

function replaceAll(str, char) {
  const re = new RegExp('[^' + char + ']', 'g');
  return str.replace(re, '');
}

function validString(s) {
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) {
      return false
    }
  }

  return true
}

// Complete the alternate function below.
function alternate(s) {
  let unique = [];
  let newString = '';
  let response = 0;
  let validStrings = [];

  // edge case
  if (s.length <= 1) {
    return 0;
  }

  for (let i = 0; i < s.length; i++) {
    if (!unique.includes(s[i])) {
      unique.push(s[i]);
    }
  }

  const pairs = getPairs(unique);

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    newString = replaceAll(s, `${pair[0]}${pair[1]}`)

    if (validString(newString)) {
      validStrings.push(newString.length);
    }
  }

  if (validStrings.length <= 0) {
    return 0
  }

  return Math.max.apply(Math, validStrings);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}
