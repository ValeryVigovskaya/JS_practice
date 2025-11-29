function popularSymbols(str) {
  let arr = str.toLowerCase().split("");
  const result = arr.reduce((acc, letter) => {
    const finderLetter = acc?.find((el) => el[0] == letter);
    const foundEntry = acc.find((el) => el[0] === letter);
    let subArr = [];
    if (!finderLetter) {
      subArr.push(letter);
      subArr.push(1);
      acc.push(subArr);
    } else {
      foundEntry[1]++;
    }

    return acc;
  }, []);
  const res = result.sort((a, b) => {
    if (a[1] === b[1] && a[1] > 3) {
      return a[2] - b[2];
    }
    return b[1] - a[1];
  });
  return res;
}

console.log(
  popularSymbols(
    "Ааааа Бббб Ввв Гг Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я"
  )
);

function createFilter(data) {
  data
    .filter((el) => el.age > 25 && el.salary > 5000000)
    .map((el) => {
      const bonus = el.salary * 0.1;
      return { ...el, bonus: bonus % 2 ? bonus : Math.floor(bonus) };
    })
    .sort((a, b) => b.salary - a.salary)
    .forEach((person) => {
      console.log(
        `${person.name} (возраст: ${person.age}) - бонус к зарплате: ${person.bonus}`
      );
    });
}

console.log(
  createFilter([
    { name: "Анна", age: 24, salary: 4500000 },
    { name: "Иван", age: 28, salary: 6000000 },
    { name: "Мария", age: 30, salary: 5500000 },
    { name: "Петр", age: 26, salary: 4800000 },
  ])
);
