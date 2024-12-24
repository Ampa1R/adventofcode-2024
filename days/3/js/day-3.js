const fs = require('fs');

function main() {
  const input = fs.readFileSync('days/3/input-3.txt', 'utf8');

  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex);

  let result = 0;

  for (const match of matches) {
    const [a, b] = match.slice(4,-1).split(',').map(Number);
    result += a * b;
  }

  console.log('Total sum of mul operations:', result);
}

main();