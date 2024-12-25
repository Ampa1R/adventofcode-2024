const fs = require('fs');

function appendOrAssign(obj, from, to, direction) {
  if (obj[from]) {
    obj[from][to] = direction;
  } else {
    obj[from] = { [to]: direction };
  }
}

function main() {
  const input = fs.readFileSync('days/5/input-5.txt', 'utf8');

  const lines = input.split('\n');

  let isReadingRules = true;

  const rulesGraph = {};

  const orders = [];
  for (const line of lines) {
    if (line === '') {
      isReadingRules = false;
      continue;
    }

    if (isReadingRules) {
      const [left, right] = line.split('|').map(Number);

      appendOrAssign(rulesGraph, left, right, 1);
      appendOrAssign(rulesGraph, right, left, -1);

      continue;
    }

    orders.push(line.split(',').map(Number));
  }
  const correctOrders = [];

  ordersList: for (const order of orders) {
    let orderIsCorrect = true;

    const prevPages = new Set();

    order: for (let i = 0; i < order.length; i++) {
      const current = order[i];

      if (!rulesGraph[current]) {
        continue;
      }

      for (const prevPage of prevPages) {
        if (rulesGraph[current][prevPage] === 1) {
          orderIsCorrect = false;
          break order;
        }
      }

      prevPages.add(current);
    }

    if (orderIsCorrect) {
      correctOrders.push(order);
    }
  }


  let sum = 0;
  for (const order of correctOrders) {
    sum += order[Math.floor(order.length / 2)];
  }
  console.log('Sum of middle page numbers:',sum);
}

main();
