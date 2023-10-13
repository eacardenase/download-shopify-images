const fs = require('fs');

const data = fs
  .readFileSync(`./utils/data/casos-activos.csv`, {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((row) => {
    const rowArray = row.split(',').map((data) => data.replace('\r', ''));

    const [consultantName, consultantId, service, therapistName, therapistId] =
      rowArray;

    return {
      consultantName,
      consultantId,
      service,
      therapistName,
      therapistId,
    };
  });

const filename = `./utils/data/casos-activos.json`;

fs.writeFileSync(filename, JSON.stringify(data));

console.log('Finished writing data');
