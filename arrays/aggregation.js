function createCost(data) {
  return data.reduce((acc, item) => {
    if (item.discount == 0) {
      return acc + item.price;
    } else {
      let cost = item.price * (1 - item.discount);
      return (acc += cost);
    }
  }, 0);
}

console.log(
  createCost([
    { name: "Пылесос", price: 10000, discount: 0.3 },
    { name: "Утюг", price: 3000, discount: 0.5 },
    { name: "Тостер", price: 1500, discount: 0.1 },
  ])
);

function createAnalisLogs(data) {
  return JSON.stringify(data.reduceRight((acc, iter) => {
    let isSuccess = 200 <= iter.status && iter.status <= 299;
    if (!acc[iter.endpoint]) {
      acc[iter.endpoint] = {
        success: 0,
        error: 0,
      };
    }
    isSuccess ? acc[iter.endpoint].success++ : acc[iter.endpoint].error++;

    return acc;
  }, {}));
}

console.log(
  createAnalisLogs([
    { endpoint: "/api/products", status: 200 },
    { endpoint: "/api/products", status: 204 },
    { endpoint: "/api/products", status: 404 },
    { endpoint: "/api/products", status: 500 },
  ])
);