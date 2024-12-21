const fs = require('node:fs/promises');

async function main() {
    const input = await fs.readFile('days/1/input-1.txt', 'utf8');

    const lines = input.split('\n');

    const leftArray = [];
    const rightArray = [];
    for (const line of lines) {
        const [left, right] = line.split('   ').map(Number);
        if (left && right) {
            leftArray.push(left);
            rightArray.push(right);
        }
    }

    leftArray.sort();
    rightArray.sort();

    let distance = 0;

    for (let i = 0; i < leftArray.length; i++) {
        const leftNum = leftArray[i];
        const rightNum = rightArray[i];
        const diff = Math.abs(leftNum - rightNum);
        distance += diff;
    }

    console.log('Similarity score is', distance);
}

main();
