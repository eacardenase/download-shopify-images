const fs = require('fs');

const { stringify } = require('csv-stringify');

const { downloadImage } = require('./utils/downloadImage');

// ### Download Images

const regex = new RegExp(
  'https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0491\\/6763\\/0501\\/products\\/(?<imageName>.*).(?<fileExtension>(jpg|png))'
);

const data = fs
  .readFileSync('./catalogs-cleaned.csv', { encoding: 'utf-8' })
  .split('\n')
  .map((row) => {
    let rowArray = row.split(',').map((data) => data.replace('\r', ''));
    let imageURL = rowArray[41];

    if (imageURL) {
      const regexData = regex.exec(imageURL);
      const imageName = regexData?.groups?.imageName;
      const fileExtension = regexData?.groups?.fileExtension;

      switch (fileExtension) {
        case 'jpg':
          rowArray.push(`${imageName}.jpg`);
          break;
        case 'png':
          rowArray.push(`${imageName}.png`);
        default:
          break;
      }
    } else {
      rowArray.push('');
    }

    return rowArray;
  });

const dataCleaned = data.map((productArray) => {
  let productString = productArray.join(',');

  return productString;
});

fs.writeFileSync(
  'shopify-catalog-v2.csv',
  JSON.stringify(dataCleaned.join('\n'))
);

// const imagesData = [];

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

function downloadProductImages(regex, productsArray) {
  const imagesNames = require('./imagesNames.json') ?? [];

  for (product of productsArray) {
    const { imageURL } = product;

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
}

// const productsData = require('./shopify-catalog-urls.json');

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
// const productsSlice = productsData.slice(0, 3000); // 395
// const productsSlice = productsData.slice(0, 3200); // 445
// const productsSlice = productsData.slice(0, 3400); // 466
// const productsSlice = productsData.slice(0, 3600); // 499
// const productsSlice = productsData.slice(0, 3800); // 516
// const productsSlice = productsData.slice(0, 4000); // 532
// const productsSlice = productsData.slice(0, 4200); // 550
// const productsSlice = productsData.slice(0, 4400); // 568
// const productsSlice = productsData.slice(0, 4600); // 586
// const productsSlice = productsData.slice(0, 4800); // 602
// const productsSlice = productsData.slice(0, 5000); // 619
// const productsSlice = productsData.slice(0, 5200); // 637
// const productsSlice = productsData.slice(0, 5400); // 655
// const productsSlice = productsData.slice(0, 5600); // 660

// downloadProductImages(regex, productsSlice);

// fs.readdir('./shopify-images', (err, files) => {
//   console.log(files.length);
// });

const filename = 'shopify-catalog-v2.csv';
const writableStream = fs.createWriteStream(filename);

const stringifier = stringify({ header: false });

const data2 = data.map((product) => {
  const imageName = product[product.length - 1];

  if (imageName.endsWith('.png')) {
    const newImageName = imageName.replace('.png', '.jpg');

    product[product.length - 1] = newImageName;
  }

  return product;
});

data2.forEach((product) => {
  stringifier.write(product);
});

stringifier.pipe(writableStream);
console.log('Finished writing data');
