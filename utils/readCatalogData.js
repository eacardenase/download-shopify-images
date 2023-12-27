const fs = require('fs');

function readCatalogData(catalogFilePath) {
  const catalogImagesURL = [];

  fs.readFileSync(catalogFilePath, { encoding: 'utf-8' })
    .split('\n')
    .forEach((row, index) => {
      const rowArray = row.split(',').map((data) => data.replace('\r', ''));
      const baseImageURL = rowArray[24];
      const variantImageURL = rowArray[43];

      if (baseImageURL) {
        catalogImagesURL.push(baseImageURL);
      }

      if (variantImageURL) {
        catalogImagesURL.push(variantImageURL);
      }
    });

  return catalogImagesURL;
}

const jvaImages = readCatalogData(`./catalogs/origin/jva.csv`);

fs.writeFile(
  './utils/data/artwork_urls.json',
  JSON.stringify(jvaImages),
  (err, res) => {
    if (err) console.log(err);

    console.log(res);
  }
);

module.exports = {
  readCatalogData,
};
