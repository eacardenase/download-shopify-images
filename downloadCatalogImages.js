const fs = require('fs');

const {
  downloadProductImages,
  createCSVWithImagesNames,
  readCatalogData,
} = require('./utils');

const shopName = 'salute';

const regexVariant1 = '0554';
const regexVariant2 = '7078';
const regexVariant3 = '4696';

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

console.log(catalogImagesURL);

downloadProductImages(shopName, regex, catalogImagesURL);

fs.readdir(`./shopify-images/${shopName}`, (err, files) => {
  console.log(files.length);
});
