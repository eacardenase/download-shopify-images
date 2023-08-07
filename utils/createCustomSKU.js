const fs = require('fs');

const { stringify } = require('csv-stringify');

const shopName = 'judo';

const data = fs
  .readFileSync(`./catalogs/origin/${shopName}-catalog.csv`, {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row) => {
    let rowArray = row.split(',').map((data) => data.replace('\r', ''));

    return rowArray;
  });

const arrayWithNewSKU = [];

for (let i = 0; i < data.length; i++) {
  const parentRow = data[i];

  const parentSku = parentRow[0];
  parentRow[0] = `${parentSku}-${i + 1}`;

  arrayWithNewSKU.push(parentRow);
}

const filename = `./catalogs/final/${shopName}-custom-sku.csv`;
const writableStream = fs.createWriteStream(filename);

const stringifier = stringify({ header: false });

arrayWithNewSKU.forEach((product) => {
  stringifier.write(product);
});

stringifier.pipe(writableStream);
console.log('Finished writing data');
