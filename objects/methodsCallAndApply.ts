const logger = {
  prefix: "[LOG]",
  log(message: string) {
    console.log(`${this.prefix} ${message}`);
  },
};
const messages = ["Server started", "User logged in", "Error occurred"];

// Выведи все сообщения в консоль с правильным префиксом,
// используя call внутри forEach.
const returnMessage = () => {
  return messages.forEach((message) => {
    return logger.log.call(logger, message);
  });
};

console.log(returnMessage());

const calculator = {
  multiplier: 2,
  multiply(a: number, b: number, c: number) {
    return (a + b + c) * this.multiplier;
  },
};

const numbers = [3, 5, 7];
// Вызови метод multiply так, чтобы:
// аргументы брались из массива numbers
// контекст был объект calculator
// использовался apply

console.log(
  calculator.multiply.apply(calculator, numbers as [number, number, number]),
);
