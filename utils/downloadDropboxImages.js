const path = require('path');
const download = require('image-downloader');

const destFolder = path.join(__dirname, 'dropbox-images');
const imageUrls = require('./data/artwork_urls.json');

const startIndex = 0;
const endIndex = startIndex + 100;

const downloadImages = async () => {
  const downloadTasks = imageUrls
    .slice(startIndex, endIndex)
    .map(async (url) => {
      const options = {
        url,
        dest: destFolder,
        timeout: 20000, // Adjust the timeout (in milliseconds) as needed
      };

      try {
        const { filename } = await download.image(options);

        console.log(`Saved ${url} to ${filename}`);

        return { success: true, filename };
      } catch (error) {
        console.error(`Error downloading ${url}:`, error);

        return { success: false, url };
      }
    });

  try {
    const downloadedImages = await Promise.all(downloadTasks);

    const failedDownloads = downloadedImages.filter(
      (result) => !result.success
    );
    if (failedDownloads.length > 0) {
      console.error(`${failedDownloads.length} images failed to download:`);
      failedDownloads.forEach(({ url }) => {
        console.log(`Failed URL: ${url}`);
      });
    }
  } catch (error) {
    console.error('Error during image downloads:', error);
  }
};

downloadImages();
