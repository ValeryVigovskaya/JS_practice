// fn - функция, которую нужно привязать.
// defaultContext - контекст по умолчанию.
// bindArgs - аргументы, которые будут переданы в функцию при вызове.

const obj = {
  defaultContext: { name: "Гость" },
  context: { name: "Павел" },
  bindArgs: ["кодить", "спать"],
  callArgs: ["пить кофе", "играть в игры"],
};

function myBind(fn, defaultContext, ...bindArgs) {
  return function (...callArgs) {
    const context = this.name ? this : defaultContext;
    return fn.apply(context, [...bindArgs, ...callArgs]);
  };
}

function worker(...args) {
  console.log(`Привет, я - ${this.name}. Люблю ${args.join(", ")}.`);
}

const { defaultContext, context, bindArgs, callArgs } = obj;
const bindedFn = myBind(worker, defaultContext, ...bindArgs);
console.log(bindedFn(...callArgs));
console.log(bindedFn.call(context, ...callArgs));
