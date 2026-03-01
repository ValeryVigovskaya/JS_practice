//пример создания функции конструктора

function Task({ title, description, completed }) {
  this.title = title;
  this.description = description;
  this.completed = completed;
}
const ex = new Task({
  title: "Купить продукты",
  description: "Сходить в магазин и купить молоко, хлеб, яйца",
  completed: false,
});
console.log(ex);

// Реализуйте функцию-конструктор ShoppingCart, которая будет представлять собой корзину покупок.
// Корзина должна хранить список товаров, а также предоставлять методы для работы с ней.

// Функция-конструктор ShoppingCart должна создавать объект со следующими методами:

// addItem(item, price) - добавляет товар item (строка) в корзину по цене price (число).
// Если товар с таким названием уже есть в корзине - не добавлять его повторно.
// Если товара с таким названием ещё нет - добавить его с указанной ценой.

// removeItem(item) - удаляет товар из корзины с названием item (строка).
// Если товара с таким названием нет - ничего не происходит.
// Если товар есть - он удаляется из корзины.

// getTotal() - возвращает общую стоимость всех товаров в корзине.
// Если корзина пуста - возвращает 0.

// clear() - полностью очищает корзину, удаляя все товары.

function ShoppingCart() {
  this.list = [];
}

ShoppingCart.prototype = {
  constructor: ShoppingCart,
  __findItem(item) {
    return this.list.find((el) => el.item == item);
  },
  addItem(item, price) {
    const findItem = this.__findItem(item);
    if (this.list.length > 0 && findItem) {
      return;
    } else {
      this.list.push({ item: item, price: price });
    }
  },
  removeItem(item) {
    const findItem = this.__findItem(item);
    if (!findItem) {
      return;
    } else {
      this.list = this.list.filter((el) => {
        if (el.item == item) {
          return false;
        }
        return true;
      });
    }
  },
  getTotal() {
    if (this.list.length == 0) {
      return 0;
    }
    return this.list.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
  },
  clear() {
    this.list = [];
  },
};

const bag = new ShoppingCart();
bag.addItem("Apple", 100);
bag.addItem("Banana", 50);
bag.removeItem("Apple");
// bag.removeItem("Помидор");
console.log(bag);

// Вам нужно реализовать две функции-конструктора:
// Task и TodoList, которые позволят создавать и управлять списком задач.
function Task(title, description) {
  if (title.length == 0) {
    throw new Error("строка пустая");
  }
  this.title = title;
  this.description = description ? description : "";
  this.completed = false;
}

function TodoList(title) {
  this.title = title;
  this.tasks = [];
}

TodoList.prototype = {
  constructor: TodoList,

  __finderTask(title) {
    const findTaskByTaskName = this.tasks.find((el) => el.title == title);
    return findTaskByTaskName;
  },

  addTask(task) {
    const findTaskByTaskName = this.__finderTask(task.title);
    if (findTaskByTaskName) {
      throw new Error("Задача с таким названием уже существует");
    }
    this.tasks.push(task);
    return this.tasks;
  },
  completeTask(title) {
    const findTaskByTaskName = this.__finderTask(title);
    if (findTaskByTaskName.completed) {
      throw new Error("Задача уже выполнена");
    }
    this.tasks.map((task) => {
      if (findTaskByTaskName.title == task.title) {
        task.completed = true;
        return task;
      }
      return task;
    });
  },
  removeTask(title) {
    const findTaskByTaskName = this.__finderTask(title);
    if (!findTaskByTaskName) {
      throw new Error("Задача не найдена");
    }
    this.tasks = this.tasks.filter(
      (task) => task.title !== findTaskByTaskName.title,
    );
    return this.tasks;
  },
  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed === true);
  },
  getPendingTasks() {
    return this.tasks.filter((task) => task.completed !== true);
  },
};

// Создайте функцию-конструктор ChatRoom,
// которая будет представлять собой чат-комнату с пользователями и сообщениями.
function ChatRoom(roomName) {
  this.roomName = roomName;
  this.users = [];
  this.messages = [];
}

ChatRoom.prototype = {
  constructor: ChatRoom,
  addUser(username) {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    if (username.length == 0 || username.includes(" ")) {
      throw new Error("Invalid username");
    }
    if (this.users.includes(username)) {
      throw new Error("User already exists");
    }
    this.users.push(username);
  },

  removeUser(username) {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    const finderUser = this.users.find((user) => user == username);
    if (!finderUser) {
      throw new Error("User not found");
    }
    this.users = this.users.filter((user) => user !== finderUser);
  },

  removeUserMessages(username) {
    let deletedMesseges = 0;
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    const messagesForDelete = this.messages.filter(
      (message) => message.username == username,
    );
    deletedMesseges = messagesForDelete.length;
    this.messages = this.messages.filter(
      (message) => message.username !== username,
    );
    return deletedMesseges;
  },
  sendMessage(username, text) {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    if (!this.users.includes(username)) {
      throw new Error("User not found");
    }
    if (typeof text !== "string") {
      throw new TypeError("Text must be a string");
    }
    if (text.length == 0 || text.trim().length == 0) {
      throw new Error("Empty text");
    }
    this.messages.push({
      username: username,
      text: text,
      date: new Date(),
    });
  },

  getMessages() {
    return this.messages.map((message) => ({ ...message }));
  },

  getUserMessages(username) {
    if (typeof username !== "string") {
      throw new TypeError("Username must be a string");
    }
    const filteredMessages = this.messages.filter(
      (message) => message.username == username,
    );
    return filteredMessages.map((message) => ({ ...message }));
  },

  getUsers() {
    return this.users.map((user) => ({ ...user }));
  },

  getMessageCount() {
    return this.messages.length;
  },
};

// Мы разрабатываем систему учёта пользователей для внутреннего использования в компании.
//  Необходимо реализовать функцию-конструктор User, которая будет создавать объекты пользователей
function User(name, gender) {
  if (!name || name.length == 0) {
    throw new Error("Name cannot be empty");
  }
  if ((gender !== "m" && gender !== "f") || !gender) {
    throw new Error('Gender must be "m" or "f"');
  }
  this.id = User.nextId++;
  this.name = name;
  this.gender = gender;
  User.totalCount++;
  if (gender === "m") {
    User.maleCount++;
  } else {
    User.femaleCount++;
  }
}
//статические методы
User.nextId = 1;
User.totalCount = 0;
User.maleCount = 0;

User.femaleCount = 0;

// Создайте функцию-конструктор Task(id, title, description, priority)
function Task(id, title, description, priority) {
  if (
    !id ||
    title == undefined ||
    description == undefined ||
    priority == undefined
  ) {
    throw new Error(
      `Argument ${!id ? "id" : title == undefined ? "title" : description == undefined ? "description" : "priority"} required`,
    );
  }
  if (!Number.isInteger(5) || id <= 0) {
    throw new Error("Invalid id: must be positive integer");
  }
  if (typeof title !== "string" || title.length == 0) {
    throw new Error("Invalid title: must be non-empty string");
  }
  if (typeof description !== "string" || description.length == 0) {
    throw new Error("Invalid description: must be non-empty string");
  }
  if (!Task.VALID_PRIORITIES.includes(priority)) {
    throw new Error(`Invalid priority: ${priority}`);
  }
  this.id = id;
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.status = "todo";
  this.assignee = null;
  this.createdAt = new Date();
}

Task.VALID_PRIORITIES = ["low", "medium", "high", "critical"];
Task.VALID_STATUSES = ["todo", "in-progress", "done"];
Task.PRIORITY_VALUES = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

Task.prototype = {
  constructor: Task,

  getPriorityLevel() {
    return Task.PRIORITY_VALUES[this.priority];
  },
  updateStatus(newStatus) {
    if (!Task.VALID_STATUSES.includes(newStatus)) {
      throw new Error(`Invalid new status: ${newStatus}`);
    }
    this.status = newStatus;
    return this.status;
  },
  assignTo(person) {
    if (typeof person !== "string" || person.length == 0) {
      throw new Error(`Invalid person: ${person}`);
    }
    this.assignee = person;
    return this.assignee;
  },
};

Task.calculateAveragePriority = function (tasks) {
  if (tasks.length == 0) {
    return null;
  }
  let finderSumAllTasks = 0;
  tasks.forEach((task) => {
    finderSumAllTasks += Task.PRIORITY_VALUES[task.priority];
  });
  let averageFromTasks = finderSumAllTasks / tasks.length;
  if (averageFromTasks <= 1.5) {
    return "low";
  } else if (averageFromTasks <= 2.5) {
    return "medium";
  } else if (averageFromTasks <= 3.5) {
    return "high";
  } else {
    return "critical";
  }
};

function Bug(id, title, description, priority, severity, reproSteps = "") {
  if (severity === undefined) {
    throw new Error("Argument severity required");
  }

  if (!Bug.VALID_SEVERITIES.includes(severity)) {
    throw new Error(`Invalid severity: ${severity}`);
  }

  // наследуем свойства Task
  Task.call(this, id, title, description, priority);

  // собственные свойства
  this.severity = severity;
  this.reproSteps = reproSteps;
}

Bug.VALID_SEVERITIES = ["low", "medium", "high", "critical"];
Bug.SEVERITY_VALUES = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};
Bug.prototype = Object.create(Task.prototype);
Bug.prototype.constructor = Bug;

Bug.prototype.getSeverityLevel = function () {
  return Bug.SEVERITY_VALUES[this.severity];
};

function Feature(id, title, description, priority, estimatedHours) {
  if (!estimatedHours) {
    throw new Error("Argument estimatedHours required");
  }
  if (typeof estimatedHours !== "number" || estimatedHours <= 0) {
    throw new Error(`Invalid estimated hours: ${estimatedHours}`);
  }
  // наследуем свойства Task
  Task.call(this, id, title, description, priority);
  this.estimatedHours = estimatedHours;
}
Feature.prototype = Object.create(Task.prototype);
Feature.prototype.constructor = Feature;
Feature.prototype.getComplexity = function () {
  if (this.estimatedHours <= 5) {
    return "simple";
  } else if (this.estimatedHours <= 15) {
    return "medium";
  } else if (this.estimatedHours <= 30) {
    return "complex";
  } else {
    return "very-complex";
  }
};

//Вы разрабатываете модуль для системы управления персоналом. Вам нужно создать иерархию классов
// для работы с сотрудниками и менеджерами, а затем обработать данные, поступающие в формате JSON.
function Employee(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;
}

Employee.prototype = {
  constructor: Employee,
  getAnnualSalary() {
    return this.salary * 12;
  },
};

function Manager(name, position, salary, bonus) {
  Employee.call(this, name, position, salary);
  this.bonus = bonus;
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;
Manager.prototype.getAnnualSalary = function () {
  return Employee.prototype.getAnnualSalary.call(this) + this.bonus;
};
function createEmployee(data) {
  if (Object.keys(data).includes("bonus")) {
    return new Manager(data.name, data.position, data.salary, data.bonus);
  } else {
    return new Employee(data.name, data.position, data.salary);
  }
}

function findManagers(employees) {
  const filteredArr = employees.filter((person) =>
    Object.keys(person).includes("bonus"),
  );
  return filteredArr;
}

function getTotalPayroll(employees) {
  let sum = 0;
  employees.forEach((person) => {
    if (person.bonus) {
      const manager = new Manager(
        person.name,
        person.position,
        person.salary,
        person.bonus,
      );
      sum += manager.getAnnualSalary();
    } else {
      const employee = new Employee(
        person.name,
        person.position,
        person.salary,
      );
      sum += employee.getAnnualSalary();
    }
    return sum;
  });
}
