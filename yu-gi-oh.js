const fs = require('fs');

const { downloadImage } = require('./Utils/downloadImage');

// ### Download all data

// fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
//     .then((data) => data.json())
//     .then((data) => {
//         fs.writeFileSync('yu-gi-oh.json', JSON.stringify(data.data));
//     });

// ### Transform data into new array

// const cardsData = require('./yu-gi-oh-data.json');

// const cardsImages = cardsData.map(({ id, name, type, card_images }) => {
//     return { id, name, type, card_images };
// });

// fs.writeFileSync('yu-gi-oh-images.json', JSON.stringify(cardsImages));

// ### Download Images

const yugiohImages = require('./yu-gi-oh-images.json'); // 12454

let test = [
    // 0, 300, *
    // 300, 600, *
    // 600, 900, *
    // 900, 1200, *
    // 1200, 1500, *
    // 1500, 1800, *
    // 1800, 2100, *
    // 2100, 2400, *
    // 2400, 2700, *
    // 2700, 3000, *
    // 3000, 3300, *
    // 3300, 3600, *
    // 3600, 3900, *
    // 3900, 4200, *
    // 4200, 4500, *
    // 4500, 4800, *
    // 4800, 5100, *
    // 5100, 5400, *
    // 5400, 5700, *
    // 5700, 6000, *
    // 6000, 6300, *
    // 6300, 6600, *
    // 6600, 6900, *
    // 6900, 7200, *
    // 7200, 7500, *
    // 7500, 7800, *
    // 7800, 8100, *
    // 8100, 8400, *
    // 8400, 8700, *
    // 8700, 9000, *
    // 9000, 9300, *
    // 9300, 9600, *
    // 9600, 9900, *
    // 9900, 10200, *
    // 10200, 10500, *
    // 10500, 10800, *
    // 10800, 11100, *
    // 11100, 11400, *
    // 11400, 11700, *
    // 11700, 12000, *
    // 12000, 12300, *
    // 12300,
];

const slice = yugiohImages.slice(12300);

for (card of slice) {
    const basePath = `./yugiohImages/${card.id}`;
    const { image_url, image_url_small, image_url_cropped } =
        card.card_images[0];

    setTimeout(() => {
        Promise.all([
            downloadImage(image_url, `${basePath}-normal.jpg`),
            // downloadImage(image_url_small, `${basePath}-small.jpg`),
            // downloadImage(image_url_cropped, `${basePath}-croppped.jpg`),
        ])
            .then(console.log)
            .catch(console.error);
    }, 1000);
}

fs.readdir('./yugiohImages', (err, files) => {
    console.log(files.length);
});
