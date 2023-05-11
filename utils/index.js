const { createCSVWithImagesNames } = require('./createCSVWithImagesNames');
const { downloadImage } = require('./downloadImage');
const { downloadProductImages } = require('./downloadProductImages');
const { readCatalogData } = require('./readCatalogData');

module.exports = {
  createCSVWithImagesNames,
  downloadImage,
  downloadProductImages,
  readCatalogData,
};
