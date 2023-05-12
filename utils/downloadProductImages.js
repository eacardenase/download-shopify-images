const fs = require('fs');

const { downloadImage } = require('./downloadImage');

function downloadProductImages(shopName, regex, productsArray) {
  const imagesNames =
    require(`../catalogs/final/${shopName}-images-names.json`) ?? [];

  for (product of productsArray) {
    const { imageURL } = product;

    if (imageURL) {
      const regexData = regex.exec(imageURL);
      const imageName = regexData?.groups?.imageName;
      const basePath = `./shopify-images/${shopName}/${imageName}`;

      if (!imagesNames.includes(`${imageName}.jpg`)) {
        setTimeout(() => {
          downloadImage(imageURL, `${basePath}.jpg`)
            .then(console.log)
            .catch(console.error);

          if (!imagesNames.includes(`${imageName}.jpg`)) {
            imagesNames.push(`${imageName}.jpg`);
          }

          fs.writeFileSync(
            `./catalogs/final/${shopName}-images-names.json`,
            JSON.stringify(imagesNames)
          );
        }, 1000);
      }
    }
  }
}

module.exports = {
  downloadProductImages,
};
