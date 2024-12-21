const fs = require('node:fs/promises');

async function main() {
    const input = await fs.readFile('days/1/input-1.txt', 'utf8');

    const lines = input.split('\n');

    const leftArray = [];
    const rightArray = Array(lines.length).fill(0);
    for (const line of lines) {
        const [left, right] = line.split('   ').map(Number);
        if (left && right) {
            leftArray.push(left);

            rightArray[right] = rightArray[right] ? rightArray[right] + 1 : 1;
        }
    }

    let similarity = 0;

    for (const num of leftArray) {
        const matches = rightArray[num] || 0;
        const localSimilarity = num * matches;
        similarity += localSimilarity;
    }

    console.log('Similarity score is', similarity);
}

main();
