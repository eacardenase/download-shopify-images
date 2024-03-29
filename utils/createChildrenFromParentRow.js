const fs = require('fs');

const { stringify } = require('csv-stringify');

const sizes = ['SM', 'MD', 'LG', 'XL', '2XL', '3XL'];
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

const dataWithSimpleProducts = [];

for (let i = 0; i < data.length; i++) {
  const parentRow = data[i];

  const parentSku = parentRow[0];

  dataWithSimpleProducts.push(parentRow);

  for (let j = 0; j < sizes.length; j++) {
    const sizeVariant = sizes[j];
    const childRow = [...parentRow];
    const childSku = parentSku.concat(`-${sizeVariant}`);

    childRow[0] = childSku;
    childRow[3] = 'simple';
    childRow[12] = 'Not Visible Individually';

    dataWithSimpleProducts.push(childRow);
  }
}

const filename = `./catalogs/final/${shopName}-children.csv`;
const writableStream = fs.createWriteStream(filename);

const stringifier = stringify({ header: false });

dataWithSimpleProducts.forEach((product) => {
  stringifier.write(product);
});

stringifier.pipe(writableStream);
console.log('Finished writing data');
