const fs = require('fs');

const { downloadImage } = require('./utils/downloadImage');

// ### Download Images

// const data = fs
//   .readFileSync('./catalogs-cleaned.csv', { encoding: 'utf-8' })
//   .split('\n')
//   .map((row) => row.split(',').map((data) => data.replace('\r', '')));

// const imagesData = [];

const productsData = require('./shopify-catalog-urls.json');

// data.forEach((campo, index) => {
//   const handle = campo[0];
//   const imageURL = campo[41];

//   imagesData.push({
//     index,
//     handle,
//     imageURL,
//   });
// });

// let count = 0;

// imageData.forEach((image) => {
//   if (!image.imageURL) {
//     count++;
//   }
// });

// console.log(count); // 1016
// console.log(imageData.length); // 5445

// const productsSlice = productsData.slice(0, 200); // 28
// const productsSlice = productsData.slice(200, 400); // 61
// const productsSlice = productsData.slice(400, 600); // 94
// const productsSlice = productsData.slice(600, 800); // 123
// const productsSlice = productsData.slice(800, 1000); // 123
// const productsSlice = productsData.slice(1000, 1200); // 153
// const productsSlice = productsData.slice(1200, 1400); // 179
// const productsSlice = productsData.slice(1400, 1600); // 202
// const productsSlice = productsData.slice(0, 1800); // 219
// const productsSlice = productsData.slice(0, 2000); // 244
// const productsSlice = productsData.slice(0, 2200); // 273
// const productsSlice = productsData.slice(0, 2400); // 307
// const productsSlice = productsData.slice(0, 2600); // 337
// const productsSlice = productsData.slice(0, 2800); // 364
const productsSlice = productsData.slice(0, 3000); // 364

const imagesNames = require('./imagesNames.json') ?? [];

for (product of productsSlice) {
  const { imageURL } = product;

  const regex = new RegExp(
    'https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0491\\/6763\\/0501\\/products\\/(?<imageName>.*).jpg'
  );

  if (imageURL) {
    const regexData = regex.exec(imageURL);
    const imageName = regexData?.groups?.imageName;
    const basePath = `./shopify-images/${imageName}`;

    if (!imagesNames.includes(`${imageName}.jpg`)) {
      setTimeout(() => {
        downloadImage(imageURL, `${basePath}.jpg`)
          .then(console.log)
          .catch(console.error);

        if (!imagesNames.includes(`${imageName}.jpg`)) {
          imagesNames.push(`${imageName}.jpg`);
        }

        fs.writeFileSync('imagesNames.json', JSON.stringify(imagesNames));
      }, 1000);
    }
  }
}

fs.readdir('./shopify-images', (err, files) => {
  console.log(files.length);
});
