const { consultants } = require('./data/consultants');

const dnis = [];
const duplicatedDnis = [];

consultants.forEach((consultant) => {
  const { dni } = consultant;

  if (!dnis.includes(dni)) {
    dnis.push(dni);
  } else {
    // throw new Error(`Email duplicapted: ${email}`);
    duplicatedDnis.push(dni);
  }
});

console.log(duplicatedDnis);
