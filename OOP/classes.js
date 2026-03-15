// Создайте класс Rectangle, который будет представлять прямоугольник
// и содержать методы для вычисления его основных характеристик.
// Конструктор должен принимать два параметра: width и height и инициализировать соответствующие свойства объекта.

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.height * this.width;
  }

  getPerimeter() {
    return (this.height + this.width) * 2;
  }
}

// Создайте класс Clock, который представляет собой цифровые часы и позволяет работать с временем в секундах, минутах и часах. Класс должен
// использовать геттеры и сеттеры для удобной работы с разными единицами измерения времени.
// Конструктор класса не принимает никаких аргументов.
class Clock {
  constructor() {
    this._totalSeconds = 0;
  }

  get totalSeconds() {
    return this._totalSeconds;
  }

  get hours() {
    return Math.floor(this._totalSeconds / 3600);
  }

  get minutes() {
    return Math.floor((this._totalSeconds % 3600) / 60);
  }

  get seconds() {
    return this._totalSeconds % 60;
  }

  get timeString() {
    const h = String(this.hours).padStart(2, "0");
    const m = String(this.minutes).padStart(2, "0");
    const s = String(this.seconds).padStart(2, "0");

    return `${h}:${m}:${s}`;
  }

  set totalSeconds(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(`Incorrect argument: ${value}`);
    }

    this._totalSeconds = value % 86400;
  }

  set seconds(value) {
    if (!Number.isInteger(value) || value < 0 || value > 59) {
      throw new Error(`Incorrect argument: ${value}`);
    }

    this._totalSeconds = this.hours * 3600 + this.minutes * 60 + value;
  }

  set minutes(value) {
    if (!Number.isInteger(value) || value < 0 || value > 59) {
      throw new Error(`Incorrect argument: ${value}`);
    }

    this._totalSeconds = this.hours * 3600 + value * 60 + this.seconds;
  }

  set hours(value) {
    if (!Number.isInteger(value) || value < 0 || value > 23) {
      throw new Error(`Incorrect argument: ${value}`);
    }

    this._totalSeconds = value * 3600 + this.minutes * 60 + this.seconds;
  }

  tick() {
    this._totalSeconds = (this._totalSeconds + 1) % 86400;
  }

  reset() {
    this._totalSeconds = 0;
  }

  setTime(hours, minutes, seconds) {
    if (
      !Number.isInteger(hours) ||
      hours < 0 ||
      hours > 23 ||
      !Number.isInteger(minutes) ||
      minutes < 0 ||
      minutes > 59 ||
      !Number.isInteger(seconds) ||
      seconds < 0 ||
      seconds > 59
    ) {
      throw new Error(`Incorrect argument`);
    }

    this._totalSeconds = hours * 3600 + minutes * 60 + seconds;
  }
}

// Создайте класс IdGenerator, который будет генерировать уникальные идентификаторы
//  для различных целей. Класс должен использовать статические свойства и методы
// для обеспечения глобальной доступности генератора и сохранения состояния счетчика между вызовами.
class IdGenerator {
  static counter = 0;

  static generateId() {
    this.counter += 1;
    return this.counter;
  }

  static reset() {
    this.counter = 0;
  }
}

// Создайте систему планирования задач с использованием наследования. Базовый класс будет определять
// общий интерфейс для всех алгоритмов планирования, а наследники реализуют конкретные стратегии.
class Task {
  constructor(id, priority, executionTime) {
    this.id = id;
    this.priority = priority;
    this.executionTime = executionTime;
  }
}

class Scheduler {
  constructor() {
    if (new.target === Scheduler) {
      throw new Error("Scheduler is abstract");
    }

    this.tasks = [];
    this.name = this.constructor.name;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  hasTasks() {
    return this.tasks.length > 0;
  }

  getNextTask() {
    throw new Error("Abstract method getNextTask()");
  }

  executeNextTask() {
    const task = this.getNextTask();
    if (!task) return null;

    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);

    return task;
  }

  getSchedule() {
    throw new Error("Abstract method getSchedule()");
  }
}

class RoundRobin extends Scheduler {
  constructor() {
    super("RoundRobin");
  }

  getNextTask() {
    if (!this.hasTasks()) return null;
    return this.tasks[0];
  }

  getSchedule() {
    return [...this.tasks];
  }
}

class PriorityScheduler extends Scheduler {
  constructor() {
    super("PriorityScheduler");
  }

  getNextTask() {
    if (!this.hasTasks()) return null;

    let best = this.tasks[0];

    for (const task of this.tasks) {
      if (task.priority > best.priority) {
        best = task;
      }
    }

    return best;
  }

  getSchedule() {
    return [...this.tasks].sort((a, b) => b.priority - a.priority);
  }
}

class ShortestJobFirst extends Scheduler {
  constructor() {
    super("ShortestJobFirst");
  }

  getNextTask() {
    if (!this.hasTasks()) return null;

    let best = this.tasks[0];

    for (const task of this.tasks) {
      if (task.executionTime < best.executionTime) {
        best = task;
      }
    }

    return best;
  }

  getSchedule() {
    return [...this.tasks].sort((a, b) => a.executionTime - b.executionTime);
  }
}

// В этот раз вы разрабатываете систему для интернет-магазина,
// которая позволяет применять различные типы скидок к товарам.
// Система должна быть создана таким образом, чтобы корректно
// обрабатывать ошибочные ситуации и дать возможность разработчику
//  по-разному реагировать на различные типы ошибок.

class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}

class DiscountApplicationError extends Error {
  constructor(message, discountType, originalPrice, discountValue) {
    super(message);
    this.name = "DiscountApplicationError";
    this.discountType = discountType;
    this.originalPrice = originalPrice;
    this.discountValue = discountValue;
  }
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this._discount = null;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    if (typeof name !== "string" || name.length === 0) {
      throw new InvalidArgumentError("Invalid name");
    }

    this._name = name;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    if (!Number.isInteger(price) || price < 0) {
      throw new InvalidArgumentError("Invalid price");
    }

    this._price = price;
  }

  get discountedPrice() {
    if (this._discount === null) {
      return this._price;
    }

    return this._discount.apply(this._price);
  }

  get discount() {
    return this._discount;
  }

  set discount(discount) {
    if (discount === null) {
      this._discount = null;
      return;
    }

    if (!(discount instanceof Discount)) {
      throw new InvalidArgumentError("Invalid discount");
    }

    this._discount = discount;
  }
}
class Discount {
  constructor() {
    if (new.target === Discount) {
      throw new Error("Discount is an abstract class");
    }
  }

  apply(price) {
    throw new Error("Method apply() must be implemented");
  }
}

class FixedDiscount extends Discount {
  constructor(amount) {
    super();

    if (!Number.isInteger(amount) || amount <= 0) {
      throw new InvalidArgumentError("Invalid discount amount");
    }

    this._amount = amount;
  }

  get amount() {
    return this._amount;
  }

  apply(price) {
    if (this._amount > price) {
      throw new DiscountApplicationError(
        "Discount exceeds price",
        this.constructor.name,
        price,
        this._amount,
      );
    }

    return price - this._amount;
  }
}

class PercentDiscount extends Discount {
  constructor(percent) {
    super();

    if (typeof percent !== "number" || percent <= 0 || percent >= 100) {
      throw new InvalidArgumentError("Invalid percent value");
    }

    this._percent = percent;
  }

  get percent() {
    return this._percent;
  }

  apply(price) {
    const discountValue = (price * this._percent) / 100;
    const result = price - discountValue;

    return Math.round(result);
  }
}

class CombinedDiscount extends Discount {
  constructor(discounts) {
    super();

    if (!Array.isArray(discounts) || discounts.length === 0) {
      throw new InvalidArgumentError("Discounts must be a non-empty array");
    }

    for (const d of discounts) {
      if (!(d instanceof Discount)) {
        throw new InvalidArgumentError("All elements must be Discount");
      }
    }

    this._discounts = discounts;
  }

  get discounts() {
    return this._discounts;
  }

  apply(price) {
    let result = price;

    for (const discount of this._discounts) {
      result = discount.apply(result);
    }

    return result;
  }
}
