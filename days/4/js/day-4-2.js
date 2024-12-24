const fs = require('fs');

const directions = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

function main() {
  const input = fs.readFileSync('days/4/input-4.txt', 'utf8');

  const lines = input.split('\n');
  const grid = lines.map(line => line.split(''));

  let result = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const current = grid[y][x];
      if (current === 'A') {
        const letters = [];
        const ls = {M: 0, S: 0};
        for (let i = 0; i < directions.length; i++) {
          const [xOffset, yOffset] = directions[i];
          const newY = y + yOffset;
          const newX = x + xOffset;

          if (grid[newY] && grid[newY][newX]) {
            letters.push(grid[newY][newX]);
            ls[grid[newY][newX]]++;
          }
        }
        if (
          ls.M === 2 && ls.S === 2
          && letters[0] !== letters[2]
          && letters[1] !== letters[3]
        ) {
          result++;
        }

      }
    }
  }
  console.log('X-MAS appears', result, 'times');
}

main();
