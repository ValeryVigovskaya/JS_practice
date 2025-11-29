//добавление элемента в инвентарь игрока
function editArray(object) {
  const array = [];
  const filteredArr = object.inventory.filter(
    (el) => el.name == object.newItem.name
  );
  let count = 0;

  object.inventory.map((el) => {
    if (filteredArr.length > 0) {
      if (el.name == object.newItem.name) {
        count += el.count + object.newItem.count;
        array.push({ name: el.name, count: count });
      } else {
        array.push(el);
      }
    } else {
      array.push(el);
    }
  });
  if (filteredArr == 0) {
    array.push(object.newItem);
  }

  while (object.maxSize < array.length) {
    array.shift();
  }
  return JSON.stringify(array);
}

console.log(
  editArray({
    inventory: [
      { name: "меч", count: 1 },
      { name: "щит", count: 1 },
      { name: "зелье", count: 3 },
      { name: "кольчуга", count: 1 },
      { name: "лук", count: 1 },
    ],
    newItem: { name: "арбалет", count: 1 },
    maxSize: 5,
  })
);


