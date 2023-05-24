const fs = require('fs');

// const { downloadImage } = require('./downloadImage');

const downloadImage = require('image-downloader');

function downloadProductImages(shopName, regex, productsArray) {
  const imagesNames =
    require(`../catalogs/final/${shopName}-images-names.json`) ?? [];

  for (product of productsArray) {
    const { imageURL } = product;

    if (imageURL) {
      const regexData = regex.exec(imageURL);
      const imageName = regexData?.groups?.imageName;
      const basePath = `./shopify-images/${shopName}/${imageName}`;

      const options = {
        url: imageURL,
        dest: basePath + '.jpg',
      };

      if (!imagesNames.includes(`${imageName}.jpg`)) {
        setTimeout(() => {
          downloadImage
            .image(options)
            .then(({ filename }) => console.log('Saved to', filename))
            .catch((err) => console.log(err));

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
