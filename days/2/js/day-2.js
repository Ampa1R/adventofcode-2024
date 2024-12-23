const fs = require('node:fs/promises');

async function main() {
    const input = await fs.readFile('days/2/input-2.txt', 'utf8');

    const lines = input.split('\n');

    let safeReports = lines.length;

    for (const line of lines) {
        const lineNumbers = line.split(' ').map(Number);

        let trend = null;
        for (let i = 1; i < lineNumbers.length; i++) {
            const prevNum = lineNumbers[i - 1];
            const num = lineNumbers[i];
            const diff = Math.abs(prevNum - num);

            if (diff < 1 || diff > 3) {
                safeReports -= 1;
                break;
            }
            const sign = prevNum > num ? -1 : 1;
            if (trend === null) {
                trend = sign;
            } else if (trend !== sign) {
                safeReports -= 1;
                break;
            }
        }
    }

    console.log('Safe reports num -', safeReports);
}

main();
