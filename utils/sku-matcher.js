const fs = require('fs');

const boxing = fs
  .readFileSync(`./sku/USA-Boxing.csv`, {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row) => {
    let rowArray = row.split(',').map((data) => data.replace('\r', ''));

    return rowArray;
  });

const productNames = [];

boxing.forEach((product) => {
  const productName = product[6];

  if (!productNames.includes(productName)) {
    productNames.push(productName);
  }
});

// fs.writeFileSync(`./sku/boxing-names.json`, JSON.stringify(productNames));

const fulfillEngine = fs
  .readFileSync(`./sku/skus-export.csv`, {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row) => {
    let rowArray = row.split(',').map((data) => data.replace('\r', ''));

    return rowArray;
  });

const matches = [];

fulfillEngine.forEach((fulfillProduct) => {
  const productName = fulfillProduct[1];

  if (productNames.includes(productName)) {
    if (!matches.includes(productName)) {
      matches.push(productName);
    }
  }
});

// fs.writeFileSync(`./sku/sku-matches.json`, JSON.stringify(matches));
