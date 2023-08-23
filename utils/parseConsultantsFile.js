const fs = require('fs');

// Function to read the file and transform it into an array of items
function readAndTransformFile(filename) {
  console.log(filename);

  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const items = data
          .trim()
          .split('\n')
          .map((row) => {
            // return row.split(',');
            const item = row.replaceAll("'", '').split(',');

            return {
              numberId: item[0],
              numberIdType: item[1],
              firstName: item[3],
              lastName: item[2],
              email: item[13],
              gender: item[4],
              birthDate: item[5],
              phone1: item[7],
              address: item[9],
              estrato: item[10],
              city: item[11],
              state: item[12],
              isForeigner: item[14] == 'si',
              isStudent: item[15] == 'si',
            };
          });
        resolve(items);
      }
    });
  });
}

async function main() {
  const filename = './utils/consultant_query.txt';

  try {
    const itemsArray = await readAndTransformFile(filename);

    console.log(itemsArray[0]);

    fs.writeFileSync(
      `./utils/consultant_data.json`,
      JSON.stringify(itemsArray)
    );
  } catch (error) {
    console.error('Error reading the file:', error.message);
  }
}

main();
