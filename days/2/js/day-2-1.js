const fs = require('node:fs/promises');

function isSafe(lineNumbers) {
    let trend = null;
    let prevNum = lineNumbers[0];
    for (let i = 1; i < lineNumbers.length; i++) {
        const num = lineNumbers[i];
        const diff = Math.abs(prevNum - num);

        if (diff < 1 || diff > 3) {
            return false;
        }
        const sign = prevNum > num ? -1 : 1;
        if (trend === null) {
            trend = sign;
        } else if (trend !== sign) {
            return false;
        }
        prevNum = num;
    }
    return true;
}

async function main() {
    const input = await fs.readFile('days/2/input-2.txt', 'utf8');

    const lines = input.split('\n');

    let safeReports = 0;

    for (const line of lines) {
        const lineNumbers = line.split(' ').map(Number);
        
        let isAnySafe = false;
        for (let i = 0; i < lineNumbers.length; i++) {
            const isLocalSafe = isSafe(lineNumbers.filter((_, index) => index !== i));
            if (isLocalSafe) {
                isAnySafe = true;
                break;
            }
        }
        if (isAnySafe) {
            safeReports += 1;
        }
    }

    console.log('Safe reports num -', safeReports);
}

main();
