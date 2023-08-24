class Task {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._dueDate = new Date();
    this._priority;
    this._completed = false;
  }
  getName() {
    return this._name;
  }
  getDescription() {
    return this._description;
  }
  setDescription(input) {
    this._description = input;
  }
  complete() {
    this._completed = true;
  }
  unComplete() {
    this._completed = false;
  }
  getDue() {
    return this._dueDate;
  }
  getCompleted() {
    return this._completed;
  }
}

export default Task;
