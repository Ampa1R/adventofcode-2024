const fs = require('fs');

const directions = [
  [1, 0],
  [1, -1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, 1],
];

const chars = ['X', 'M', 'A', 'S'];

function main() {
  const input = fs.readFileSync('days/4/input-4.txt', 'utf8');

  const lines = input.split('\n');
  const grid = lines.map(line => line.split(''));

  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const current = grid[y][x];
      if (current === chars[0]) {

        for (let i = 0; i < directions.length; i++) {
          const [xOffset, yOffset] = directions[i];
          let newY = y;
          let newX = x;

          for (let j = 1; j < chars.length; j++) {
            newY += yOffset;
            newX += xOffset;
            if (grid[newY] && grid[newY][newX] && grid[newY][newX] === chars[j]) {
              if (j === chars.length - 1) {
                result++;
              }
            } else {
              break;
            }

          }

        }

      }
    }
  }
  console.log('XMAS appears', result, 'times');
}

main();
