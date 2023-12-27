const fs = require('fs');
const path = require('path');

const {
  downloadProductImages,
  createCSVWithImagesNames,
  readCatalogData,
} = require('./utils');

const shopName = 'jva';

const regexVariant1 = '0637';
const regexVariant2 = '8861';
const regexVariant3 = '3870';

const regex = new RegExp(
  `https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/${regexVariant1}\\/${regexVariant2}\\/${regexVariant3}\\/products\\/(?<imageName>.*).(?<fileExtension>(jpg|png))`
);

const { arrayWithImageURL, catalogImagesURL } = readCatalogData(
  `./catalogs/origin/${shopName}.csv`,
  regex
);

const filename = `./catalogs/final/${shopName}-finished.csv`;

createCSVWithImagesNames(shopName, filename, arrayWithImageURL);

// ### Download Images

downloadProductImages(shopName, regex, catalogImagesURL);

fs.readdir(`./shopify-images/${shopName}`, (err, files) => {
  console.log(files.length);
});
