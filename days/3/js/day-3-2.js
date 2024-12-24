const fs = require('fs');

function main() {
  const input = fs.readFileSync('days/3/input-3.txt', 'utf8');

  const regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
  const matches = input.match(regex);

  let result = 0;

  let sumEnabled = true;
  for (const match of matches) {
    const [op] = match.split('(');
    switch (op) {
      case 'mul':
        if (sumEnabled) {
          const [a, b] = match.slice(4,-1).split(',').map(Number);
          result += a * b;
        }
        break;
      case 'do':
        sumEnabled = true;
        break;
      case "don't":
        sumEnabled = false;
        break;
    }
  }

  console.log('Total sum of mul operations:', result);
}

main();