// Создайте объект
const smartObject = {
  // Приватные переменные
  _status: "inactive",
  _history: [],
  // Геттер и сеттер для status
  get status() {
    return this._status;
  },
  set status(newStatus) {
    if (!["active", "inactive", "pending", "deleted"].includes(newStatus)) {
      throw new Error("Invalid status value");
    }
    // Записываем изменение в историю
    this._history.push({ from: this._status, to: newStatus });
    this._status = newStatus;
  },

  // Геттер для истории (возвращает копию)
  get history() {
    return this._history.slice(); // поверхностная копия
  },
};
