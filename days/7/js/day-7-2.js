const fs = require('fs');

const operators = {
  '0': '+',
  '1': '*',
  '2': '|',
};

function main() {
  const input = fs.readFileSync('days/7/input-7.txt', 'utf8');

  const lines = input.split('\n');

  let total = 0;
  for (const line of lines) {
    const [rawResult, parts] = line.split(': ');
    const expectedResult = Number(rawResult);
    const numbers = parts.split(' ').map(Number);
    
    lineLoop: for (let i = 0; i < 3 ** (numbers.length - 1); i++) {
      let result = numbers[0];
      const symbols = i.toString(3).padStart(numbers.length - 1, 0).replace(/./g, (match) => {
        return operators[match];
      });

      caseLoop: for (let j = 0; j < symbols.length; j++) {
        const symbol = symbols[j];
        const number = numbers[j + 1];
        
        if (symbol === '+') {
          result += number;
        } else if (symbol === '*') {
          result *= number;
        } else if (symbol === '|') {
          result = Number(`${result}${number}`);
        }

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
