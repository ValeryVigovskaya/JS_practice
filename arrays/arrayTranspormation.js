function filteredArr(data) {
  return data
    .map((arr) => {
      return arr.filter((el) => el > 0);
    })
    .flat(Infinity);
}

console.log(
  filteredArr([
    [-1, 2, -3, 4],
    [5, -6, 7],
    [-8, -9, 10, 11],
  ])
);

function toDoStudents(data) {
  return data
    .filter((student) => student.score > 50)
    .map((student) => {
      return { name: student.name, grade: student.score >= 90 ? "A" : "B" };
    });
}

console.log(
  toDoStudents([
    { name: "Аня", score: 95 },
    { name: "Петя", score: 45 },
    { name: "Саша", score: 85 },
    { name: "Лена", score: 92 },
  ])
);

function filterProducts(data) {
  return data.products
    .filter((product) => product.inStock == true)
    .filter((product) => {
      if (
        product.tags
          .map((el) => {
            return data.allowedTags.includes(el);
          })
          .every((el) => el == true) == true
      ) {
        return true;
      }
      return false;
    })
    .map((product) => product.name);
}

console.log(
  filterProducts({
    allowedTags: ["электроника", "гаджеты", "мобильные"],
    products: [
      { name: "Айфон 15", tags: ["мобильные", "электроника"], inStock: true },
      {
        name: "Ноутбук Lenovo",
        tags: ["электроника", "компьютеры"],
        inStock: true,
      },
      { name: "Умные часы", tags: ["гаджеты", "электроника"], inStock: false },
      {
        name: "Планшет Samsung",
        tags: ["мобильные", "гаджеты"],
        inStock: true,
      },
    ],
  })
);
