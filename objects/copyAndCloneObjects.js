function compareObjects(objectArrays) {
  let count = 0;
  objectArrays.arr1.forEach((el) => {
    const findEl = objectArrays.arr2.find(
      (el2) => el.id == el2.id && el.name == el2.name
    );
    if (findEl) {
      count++;
    }
  });
  return count == objectArrays.arr1.length &&
    objectArrays.arr1.length == objectArrays.arr2.length
    ? true
    : false;
}

console.log(
  compareObjects({
    arr1: [{ id: 1, name: "Иван" }],
    arr2: [
      { id: 1, name: "Иван" },
      { id: 2, name: "Мария" },
    ],
  })
);
