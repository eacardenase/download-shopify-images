const fs = require('fs');

function readCatalogData(catalogFilePath, regex) {
  const catalogImagesURL = [];

  const arrayWithImageURL = fs
    .readFileSync(catalogFilePath, { encoding: 'utf-8' })
    .split('\n')
    .map((row) => {
      const rowArray = row.split(',').map((data) => data.replace('\r', ''));
      const baseImageURL = rowArray[24];
      const variantImageURL = rowArray[43];

      let regexData = '';
      let imageName = '';
      let imageURL = '';

      const imagesURL = {
        baseImageURL,
        variantImageURL,
      };

      if (imagesURL.baseImageURL) {
        regexData = regex.exec(baseImageURL);
        imageName = regexData?.groups?.imageName;
        imageURL = imagesURL.baseImageURL;

        rowArray.push(`${imageName}.jpg`);
      } else if (imagesURL.variantImageURL) {
        regexData = regex.exec(variantImageURL);
        imageName = regexData?.groups?.imageName;
        imageURL = imagesURL.variantImageURL;

        rowArray.push(`${imageName}.jpg`);
      } else {
        rowArray.push('');
      }

      catalogImagesURL.push({
        imageName: imageName ? `${imageName}.jpg` : '',
        imageURL,
      });

      return rowArray;
    });

  return { arrayWithImageURL, catalogImagesURL };
}

module.exports = {
  readCatalogData,
};
