const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const folderPath = path.join(__dirname, 'dropbox-images');
const outputFile = './output.csv'; // Change this to your desired output CSV file path

const fileNames = [];

// Read the files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Iterate through files and store names in the array
  files.forEach((file) => {
    fileNames.push({ artwork_name: file });
  });

  // Convert the array to CSV format
  const csv = Papa.unparse(fileNames, {
    header: true,
  });

  // Write the CSV to the output file
  fs.writeFile(outputFile, csv, (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file:', writeErr);
    } else {
      console.log('File names written to', outputFile);
    }
  });
});
