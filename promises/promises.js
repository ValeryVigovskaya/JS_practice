// Реализуйте функцию retry(fn, retries), которая возвращает Promise.
// Функция retry будет пытаться выполнить функцию fn, пока Promise,
// возвращаемый fn(), не разрешится успешно, либо пока не будет
// исчерпано количество попыток (не более retries раз).

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
