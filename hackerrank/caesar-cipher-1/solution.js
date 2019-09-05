'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// ------------------------------------------------------------------------------------

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// create a new alphabet with rotate values
function getNewAlphabet(k) {
  const alArr = alphabet.split('');
  const newArr = [];
  let invalid = 0;

  // if the number of letters (k) is greater than the length of the alphabet, substract it until k is smaller than alphabet's length
  while (k > alphabet.length) {
    k = k - alphabet.length;
  }

  // store undefined values
  for (let i = 0; i < alphabet.length; i++) {
    if (!alphabet[i + k]) {
      invalid++;
    } else {
      newArr.push(alphabet[i + k]);
    }
  }

  for (let i = 0; i < invalid; i++) {
    newArr.push(alphabet[i]);
  }

  return newArr;
}

function caesarCipher(s, k) {
  const newAlphabet = getNewAlphabet(k);
  const sArr = s.split('');
  let newArr = [];
  let uppercase = [];

  sArr.forEach(item => {
    let upperCase = false; // we have to know where should we add an uppercase letter

    if (item === item.toUpperCase()) {
      upperCase = true;
    }

    const index = alphabet.indexOf(item.toLowerCase()); // we only store lowercase letters

    if (index >= 0) {
      !upperCase ? newArr.push(newAlphabet[index]) : newArr.push(newAlphabet[index].toUpperCase());
    } else {
      newArr.push(item); // add also the special characters
    }
  });

  return newArr.join('');
}

// ------------------------------------------------------------------------------------

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const k = parseInt(readLine(), 10);

    let result = caesarCipher(s, k);

    ws.write(result + "\n");

    ws.end();
}
