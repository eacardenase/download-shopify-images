const fs = require('fs');

// Function to read the file and transform it into an array of items
function readAndTransformFile(filename) {
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

            console.log(item);

            return {
              dni: item[0],
              dniType: item[1],
              password: item[2],
              lastName: item[3],
              firstName: item[4],
              gender: item[5],
              birthDate: item[6],
              phone1: item[8],
              address: item[10],
              city: item[11],
              state: item[12],
              email: item[13],
            };
          });
        resolve(items);
      }
    });
  });
}

async function main() {
  const filename = './utils/users_query.txt';

  try {
    const itemsArray = await readAndTransformFile(filename);

    console.log(itemsArray[0]);

    fs.writeFileSync(`./utils/users_data.json`, JSON.stringify(itemsArray));
  } catch (error) {
    console.error('Error reading the file:', error.message);
  }
}

main();
