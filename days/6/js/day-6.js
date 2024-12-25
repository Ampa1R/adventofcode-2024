const fs = require('fs');

function getDirection() {

}

function main() {
  const input = fs.readFileSync('days/6/input-6.txt', 'utf8');
  const lines = input.split('\n');
  const grid = lines.map(line => line.split(''));

  let currentX;
  let currentY;
  gridRoot: for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '^') {
        currentY = i;
        currentX = j;
        break gridRoot;
      }
    }
  }

  const visited = new Set([`${currentX},${currentY}`]);

  let direction = 0;

  function getNextCell() {
    const modulo = direction % 4;
    if (modulo === 0) {
      return [currentX, currentY - 1];
    }
    if (modulo === 1) {
      return [currentX + 1, currentY];
    }
    if (modulo === 2) {
      return [currentX, currentY + 1];
    }
    if (modulo === 3) {
      return [currentX - 1, currentY];
    }
  }

  function isOffTheGrid(x, y) {
    return x < 0 || y < 0 || x >= grid[0].length || y >= grid.length;
  }

  while (true) {
    const [nextX, nextY] = getNextCell();

    if (isOffTheGrid(nextX, nextY)) {
      break;
    }

    if (grid[nextY][nextX] === '#') {
      direction++;
      continue;
    }

    currentX = nextX;
    currentY = nextY;
    visited.add(`${currentX},${currentY}`);
  }

  console.log(visited.size);
}

main();
