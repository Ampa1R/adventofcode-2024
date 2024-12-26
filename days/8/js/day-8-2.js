const fs = require('fs');

function isInGrid(coords, grid) {
  return coords[0] >= 0 && coords[0] < grid[0].length && coords[1] >= 0 && coords[1] < grid.length;
}

function main() {
  const input = fs.readFileSync('days/8/input-8.txt', 'utf8');

  const lines = input.split('\n');

  const antinodes = new Set();

  const locations = {};

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === '.') {
        continue;
      }

      if (locations[char]) {
        locations[char].push([x, y]);
      } else {
        locations[char] = [[x, y]];
      }
      antinodes.add(`${x},${y}`);
    }
  }

  for (const locs of Object.values(locations)) {
    for (let i = 0; i < locs.length; i++) {
      const locLeft = locs[i];
      for (let j = i + 1; j < locs.length; j++) {
        const locRight = locs[j];

        const xDiff = locLeft[0] - locRight[0];
        const yDiff = locLeft[1] - locRight[1];

        let leftAntinodeLocation = [locLeft[0] + xDiff, locLeft[1] + yDiff];

        while (isInGrid(leftAntinodeLocation, lines)) {
          const [lx, ly] = leftAntinodeLocation;
          antinodes.add(`${lx},${ly}`);
          leftAntinodeLocation = [lx + xDiff, ly + yDiff];
        }

        let rightAntinodeLocation = [locRight[0] - xDiff, locRight[1] - yDiff];

        while (isInGrid(rightAntinodeLocation, lines)) {
          const [rx, ry] = rightAntinodeLocation;
          antinodes.add(`${rx},${ry}`);
          rightAntinodeLocation = [rx - xDiff, ry - yDiff];
        }
      }
    }
  }


  console.log('Unique antinodes count is', antinodes.size);
}

main();