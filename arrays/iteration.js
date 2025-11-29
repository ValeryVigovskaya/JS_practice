function createCheck(data) {
  const createString = (item, index) =>
    `${index + 1}. ${item.name} - ${item.price} руб.`;
  data.forEach((item, index) => {
    console.log(createString(item, index));
  });
}

console.log(
  createCheck([
    { name: "Капучино", price: 120 },
    { name: "Круассан", price: 80 },
  ])
);

function createRating(data) {
  const pairs = data.sort((a, b) => b.iq - a.iq).entries();
  for (const human of pairs) {
    console.log(`${human[0] + 1}: ${human[1].name} (IQ: [${human[1].iq}])`);
  }
}

console.log(
  createRating([
    { name: "Капитан Керн", iq: 150 },
    { name: "Глорибас", iq: 120 },
    { name: "Танос", iq: 200 },
  ])
);
