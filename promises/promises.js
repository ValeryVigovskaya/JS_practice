require("dotenv").config();

// Реализуйте функцию retry(fn, retries), которая возвращает Promise.
// Функция retry будет пытаться выполнить функцию fn, пока Promise,
// возвращаемый fn(), не разрешится успешно, либо пока не будет
// исчерпано количество попыток (не более retries раз).

const process = require("node:process");

function retry(fn, retries) {
  return new Promise((resolve, reject) => {
    if (retries <= 0) {
      reject(new Error("Retries must be greater than 0"));
      return;
    }

    let attempts = 0;

    function attempt() {
      attempts++;

      fn()
        .then(resolve)
        .catch((error) => {
          if (attempts >= retries) {
            reject(error);
          } else {
            attempt();
          }
        });
    }

    attempt();
  });
}

// Реализуйте функцию deferredPromise(fn), которая создает "отложенный" промис.
// Функция должна возвращать объект с двумя полями:
// promise - свойство, содержащее промис, который будет
//  разрешен/отклонен результатом выполнения функции fn.
// execute() - метод, который запускает выполнение функции fn.
function deferredPromise(fn) {
  let started = false;

  let resolveRef, rejectRef;

  const promise = new Promise((resolve, reject) => {
    resolveRef = resolve;
    rejectRef = reject;
  });

  return {
    promise,
    execute() {
      if (started) return;
      started = true;

      try {
        const result = fn();

        if (!(result instanceof Promise)) {
          resolveRef(result);
        } else {
          result.then(resolveRef).catch(rejectRef);
        }
      } catch (err) {
        rejectRef(err);
      }
    },
  };
}

function withTimeout(promise, ms) {
  if (ms <= 0) {
    return Promise.reject(new Error("timeout"));
  }

  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("timeout"));
    }, ms);
  });

  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise,
  ]);
}

// Вам нужно реализовать асинхронную функцию processNewsStreams(iterators, targetTags),
// которая принимает массив объектов iterators (каждый объект содержит асинхронный итератор
//  и имя источника: {name, iterator}), а также массив тегов targetTags.
// Функция должна параллельно обрабатывать все переданные асинхронные потоки новостей.
// Каждый поток может содержать новости, а также может завершиться ошибкой.
// Ваша задача - вывести в консоль только новости с определенными тегами и
// корректно обработать ошибки в потоках.
async function processNewsStreams(iterators, targetTags) {
  const tasks = iterators.map(async ({ name, iterator }) => {
    try {
      for await (const item of iterator) {
        // Обработка ошибки из потока
        if (item.type === "error") {
          console.log(`[${name}] ОШИБКА: ${item.message}`);
          return;
        }

        // Обработка новости
        if (item.type === undefined) {
          const matchedTags = item.tags.filter((tag) =>
            targetTags.includes(tag),
          );

          if (matchedTags.length > 0) {
            console.log(
              `[${name}] ${item.title} (теги: ${matchedTags.join(", ")})`,
            );
          }
        }
      }

      // Успешное завершение
      console.log(`[${name}] Поток завершен успешно`);
    } catch (err) {
      // Если сам итератор выбросил ошибку
      console.log(`[${name}] ОШИБКА: ${err.message}`);
    }
  });

  // Параллельный запуск всех потоков
  await Promise.all(tasks);
}

async function getProductDetails(productId) {
  const response = await fetch(
    `${process.env["BASE_URL"]}/v1/products/${productId}`,
  );

  const data = await response.json();

  const result = await Promise.all(
    Object.keys(data).map(async (key) => {
      switch (key) {
        case "name":
          return `Название товара: ${data.name}`;

        case "price":
          return `Цена: ${data.price}`;

        case "category_id":
          const resCategory = await fetch(
            `${process.env["BASE_URL"]}/v1/categories/${data.category_id}`,
          );
          const dataCategory = await resCategory.json();
          return `Категория: ${dataCategory.name}`;

        case "brand_id":
          const resBrand = await fetch(
            `${process.env["BASE_URL"]}/v1/brands/${data.brand_id}`,
          );
          const dataBrand = await resBrand.json();

          return `Бренд: ${dataBrand.name}`;

        case "description":
          return `Описание: ${data.description}`;
        default:
          return null;
      }
    }),
  );
  return result.filter((el) => el != null);
}

async function main() {
  const result = await getProductDetails(
    "3df43a13-a4b4-4ed6-bfa0-10ed1d741bac",
  );
  console.log(result);
}
main();

async function getCategoryPriceAnalysis() {
  try {
    const BASE_URL = process.env["BASE_URL"];

    const categoriesRes = await fetch(`${BASE_URL}/v1/categories`);
    if (!categoriesRes.ok) {
      throw new Error(`Ошибка загрузки категорий: ${categoriesRes.status}`);
    }
    const categories = await categoriesRes.json();

    const productsRes = await fetch(`${BASE_URL}/v1/products`);
    if (!productsRes.ok) {
      throw new Error(`Ошибка загрузки товаров: ${productsRes.status}`);
    }
    const products = await productsRes.json();

    const categoryMap = new Map();

    for (const product of products) {
      if (!product.in_stock) continue;

      if (!categoryMap.has(product.category_id)) {
        categoryMap.set(product.category_id, []);
      }

      categoryMap.get(product.category_id).push(product.price);
    }

    const result = new Map();

    for (const category of categories) {
      const prices = categoryMap.get(category.id);

      if (!prices || prices.length === 0) continue;
      prices.sort((a, b) => a - b);

      const count = Math.ceil(prices.length * 0.1);

      const cheapest = prices.slice(0, count);

      const avg =
        cheapest.reduce((sum, price) => sum + price, 0) / cheapest.length;

      result.set(category.name, Math.round(avg));
    }

    return result;
  } catch (error) {
    throw new Error(`Ошибка анализа цен: ${error.message}`);
  }
}
