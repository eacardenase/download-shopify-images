const fs = require('fs');

const { stringify } = require('csv-stringify');

function createCSVWithImagesNames(shopName, filenameToStore, productsArray) {
  const writableStream = fs.createWriteStream(filenameToStore);

  const stringifier = stringify({ header: false });

  productsArray.forEach((product) => {
    stringifier.write(product);
  });

  stringifier.pipe(writableStream);
  console.log('Finished writing data');
}

module.exports = {
  createCSVWithImagesNames,
};
