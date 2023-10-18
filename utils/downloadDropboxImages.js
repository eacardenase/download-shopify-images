const path = require('path');
const download = require('image-downloader');

const destFolder = path.join(__dirname, 'dropbox-images');

const imageUrls = require(`./data/artwork-names.json`);

const downloadImages = async () => {
  const downloadTasks = imageUrls.map((url, index) => {
    const options = {
      url,
      dest: destFolder,
    };

    return download.image(options);
  });

  try {
    const downloadedImages = await Promise.all(downloadTasks);
    downloadedImages.forEach(({ filename }) => {
      console.log(`Saved to ${filename}`);
    });
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadImages();
