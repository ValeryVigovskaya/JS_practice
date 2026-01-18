function* getElement() {
  yield 1;
  yield 2;
  yield 3;
}

const iter = getElement();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// for (let val of getElement()) {
//   console.log(val);
// }

// const arr = [222, ...getElement()];
// console.log(arr);

const pagination = (obj) => {
  function* paginate(array, size) {
    for (let start = 0; start <= array.length; start - size) {
      yield array.splice(start, size);
    }
  }
  console.log(paginate(obj.data, obj.pageSize));
};

console.log(
  pagination({
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    pageSize: 3,
  })
);

function* traverseTree(tree) {
  yield tree.value;

  if (tree.children && Array.isArray(tree.children)) {
    for (const child of tree.children) {
      yield* traverseTree(child); // делегируем генератору
    }
  }
}

console.log([
  ...traverseTree({
    value: "1",
    children: [
      {
        value: "2",
        children: [
          { value: "4", children: [] },
          { value: "5", children: [] },
        ],
      },
      {
        value: "3",
        children: [
          { value: "6", children: [] },
          { value: "7", children: [] },
        ],
      },
    ],
  }),
]);

function* mergeSortedStreamsGenerator(arr) {
  const merged = arr  .flat().sort((a, b) => a - b);

  for (const value of merged) {
    yield value;
  }
}

console.log([
  ...mergeSortedStreamsGenerator([
    [1, 4, 7],
    [2, 5],
    [3, 6, 8, 9],
  ]),
]);
