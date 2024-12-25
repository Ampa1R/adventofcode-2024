const fs = require('fs');

const operators = ['+', '*'];

function main() {
  const input = fs.readFileSync('days/7/input-7.txt', 'utf8');

  const lines = input.split('\n');

  let total = 0;
  for (const line of lines) {
    const [rawResult, parts] = line.split(': ');
    const expectedResult = Number(rawResult);
    const numbers = parts.split(' ').map(Number);
    
    lineLoop: for (let i = 0; i < 2 ** numbers.length; i++) {
      let result = 0;
      const symbols = i.toString(2).padStart(numbers.length, 0).replaceAll('0', '+').replaceAll('1', '*');
      caseLoop: for (let j = 0; j < symbols.length; j++) {
        const symbol = symbols[j];
        const number = numbers[j];
        result = symbol === '+' ? result + number : result * number;
        if (result === expectedResult) {
          total += expectedResult;
          break lineLoop;
        }
      }
    }
  }

  console.log('Calibration result is', total);
}

main();
