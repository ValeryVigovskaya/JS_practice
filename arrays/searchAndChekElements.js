//проверка элементов с помощью every

function createSpeedMessage(data) {
  return data.every((el, index) => {
    if (index === data.length - 1) return true;
    const time = new Date(el.timestamp);
    const nextItem = data[index + 1];

    const nextTime = new Date(nextItem?.timestamp);

    return time.getTime() < nextTime.getTime();
  });
}

console.log(
  createSpeedMessage([
    {
      id: 1001,
      timestamp: "2025-04-05T14:30:00.000Z",
      message: "Server started successfully",
    },
    {
      id: 1002,
      timestamp: "2025-04-05T14:30:05.000Z",
      message: "Database connection established",
    },
    {
      id: 1003,
      timestamp: "2025-04-05T14:30:12.000Z",
      message: "API endpoint /users initialized",
    },
    {
      id: 1004,
      timestamp: "2025-04-05T14:30:20.000Z",
      message: "Cache warmed up",
    },
  ])
);

function findLast(data) {
  let scoreObject = {
    low: 1,
    medium: 2,
    high: 3,
  };
  let createNumTargetPriority = scoreObject[data.targetPriority];
  const findItemIndex = data.tasks.findLastIndex(
    (el) =>
      scoreObject[el.priority] == createNumTargetPriority ||
      scoreObject[el.priority] > createNumTargetPriority
  );
  return findItemIndex;
}

console.log(
  findLast({
    tasks: [],
    targetPriority: "high",
  })
);

function targerPerson(data) {
  return (
    data.rooms
      .find((room) => room.name == data.targetRoom)
      ?.people.find((pers) => pers.name == data.targetPerson).id ??
    "Человек не найден"
  );
}

console.log(
  targerPerson({
    rooms: [],
    targetPerson: "Елена",
    targetRoom: "Библиотека",
  })
);
