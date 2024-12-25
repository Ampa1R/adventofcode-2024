const fs = require('fs');

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
    }
  }

  for (const locs of Object.values(locations)) {
    for (let i = 0; i < locs.length; i++) {
      const locLeft = locs[i];
      for (let j = i + 1; j < locs.length; j++) {
        const locRight = locs[j];

        const xDiff = locLeft[0] - locRight[0];
        const yDiff = locLeft[1] - locRight[1];

        const leftAntinodeLocation = [locLeft[0] + xDiff, locLeft[1] + yDiff];
        const rightAntinodeLocation = [locRight[0] - xDiff, locRight[1] - yDiff];

        if (
          leftAntinodeLocation[0] >= 0 &&
          leftAntinodeLocation[0] < lines[0].length &&
          leftAntinodeLocation[1] >= 0 &&
          leftAntinodeLocation[1] < lines.length
        ) {
          antinodes.add(`${leftAntinodeLocation[0]},${leftAntinodeLocation[1]}`);
        }

        if (
          rightAntinodeLocation[0] >= 0 &&
          rightAntinodeLocation[0] < lines[0].length &&
          rightAntinodeLocation[1] >= 0 &&
          rightAntinodeLocation[1] < lines.length
        ) {
          antinodes.add(`${rightAntinodeLocation[0]},${rightAntinodeLocation[1]}`);
        }
      }
    }
  }

  console.log('Unique antinodes count is', antinodes.size);
}

main();