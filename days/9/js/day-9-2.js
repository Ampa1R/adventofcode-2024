const fs = require('fs');

function main() {
  const input = fs.readFileSync('days/9/input-9.txt', 'utf8');

  let memory = [];
  let freeSpaces = [];
  let mostRightFile = null;
  const files = [];

  for (let i = 0, id = 0; i < input.length; i += 2, id++) {
    const fileSize = Number(input[i]);

    mostRightFile = [memory.length, fileSize];
    files.push([memory.length, fileSize]);

    for (let j = 0; j < fileSize; j++) {
      memory.push(id);
    }

    const freeSpaceSize = Number(input[i + 1]) || 0;

    freeSpaces.push([memory.length, freeSpaceSize]);

    for (let j = 0; j < freeSpaceSize; j++) {
      memory.push('.');
    }
  }

  while (files.length > 0) {
    const [fileStart, fileSize] = files.pop();

    let memoryPart = null;
    let memoryPartIndex = null;
    for (let i = 0; i < freeSpaces.length; i++) {
      const [freeStart, freeSize] = freeSpaces[i];

      if (freeSize >= fileSize && freeStart < fileStart) {
        memoryPart = [freeStart, fileSize];
        memoryPartIndex = i;
        break;
      }
    }

    if (memoryPart === null) {
      continue;
    }
    const id = memory[fileStart];

    for (let i = 0; i < fileSize; i++) {
      memory[memoryPart[0] + i] = id;
      memory[fileStart + i] = '.';
    }

    freeSpaces[memoryPartIndex][1] -= fileSize;
    if (freeSpaces[memoryPartIndex][1] === 0) { 
      freeSpaces.splice(memoryPartIndex, 1);
    } else {
      freeSpaces[memoryPartIndex][0] += fileSize;
    }
    // console.log(memory);
  }

  let checksum = 0;

  for (let i = 0; i < memory.length; i++) {
    const blockFileId = memory[i];
    if (blockFileId === '.') {
      continue;
    }
    checksum += blockFileId * i;
  }
  console.log('Checksum is', checksum);
}

main();