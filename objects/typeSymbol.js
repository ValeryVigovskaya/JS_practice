//используется для определения уникальности
const sym = Symbol(1);
console.log(sym);
//чтобы создать символ глобальный, используется for
const sym1 = Symbol.for("id");
console.log(sym1);

//ключ в объекте можно иcпользовать Symbol

function getPriceInNumbersDescriptionString(data) {
  data[Symbol.toPrimitive] = function (hint) {
    if (hint === "number") {
      return this.price;
    } else if (hint === "string") {
      return `Товар: ${this.name}. Эффект: ${this.effect}.`;
    }
  };
  return JSON.stringify(
    { numericValue: +data, stringValue: String(data) },
    null,
    4
  );
}

console.log(
  getPriceInNumbersDescriptionString({
    name: "Зелье невидимости",
    price: 500,
    effect: "Делает пьющего невидимым на 10 минут",
  })
);

//Итерируемый объект с пользовательским шагом

function createItterObject(data) {
  data[Symbol.iterator] = function () {
    let current = this.start;
    let last = this.end;
    let step = this.step;
    if (step == 0) {
      return {
        next() {
          return { done: true };
        },
      };
    } else
      return {
        next() {
          if ((step > 0 && current <= last) || (step < 0 && current >= last)) {
            const value = current;
            current += step;
            return {
              done: false,
              value: value,
            };
          } else {
            return {
              done: true,
            };
          }
        },
      };
  };
  let arr = [];

  for (let num of data) {
    arr.push(num);
  }

  return arr;
}

console.log(
  createItterObject({
    start: -100,
    end: 100,
    step: 10,
  })
);
