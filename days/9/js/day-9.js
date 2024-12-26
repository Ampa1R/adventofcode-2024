const fs = require('fs');

function main() {
  const input = fs.readFileSync('days/9/input-9.txt', 'utf8');

  let memory = [];
  let mostLeftFreeSpaceIndex = null;
  let mostRightFileIndex = 0;
  for (let i = 0, id = 0; i < input.length; i += 2, id++) {
    const fileSize = input[i];

    for (let j = 0; j < fileSize; j++) {
      memory.push(id);
    }

    if (memory.length > mostRightFileIndex) {
      mostRightFileIndex = memory.length - 1;
    }

    const freeSpaceSize = input[i + 1] || 0;

    if (mostLeftFreeSpaceIndex === null) {
      mostLeftFreeSpaceIndex = memory.length;
    }

    for (let j = 0; j < freeSpaceSize; j++) {
      memory.push('.');
    } 
  }

  while (true) {
    const fileBlock = memory[mostRightFileIndex];
    memory[mostRightFileIndex] = '.';

    for (let i = memory.length - 1; i >= mostLeftFreeSpaceIndex; i--) {
      if (memory[i] !== '.') {
        mostRightFileIndex = i;
        break;
      }
    }

    memory[mostLeftFreeSpaceIndex] = fileBlock;
    
    for (let i = mostLeftFreeSpaceIndex + 1; i < memory.length; i++) {
      if (memory[i] === '.') {
        mostLeftFreeSpaceIndex = i;
        break;
      }
    }

    if (mostLeftFreeSpaceIndex > mostRightFileIndex) {
      break;
    }
  }

  let checksum = 0;

  for (let i = 0; i < memory.length; i++) {
    const blockFileId = memory[i];
    if (blockFileId === '.') {
      break;
    }
    checksum += blockFileId * i;
  }
  console.log('Checksum is', checksum);
}

main();