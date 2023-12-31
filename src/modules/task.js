import {
  format,
  setHours,
  setMinutes,
  getDate,
  setDate,
  setMonth,
} from "date-fns";
class Task {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._dueDate = new Date();
    this._priority;
    this._completed = false;
    this._hasTime = false;
    this._reloadFunc;
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
  getRawDue() {
    return this._dueDate;
  }
  getDue() {
    let formattedDate = `${format(this._dueDate, "P")}`;
    if (this._hasTime) {
      formattedDate += ` ${format(this._dueDate, "p")}`;
    }
    return formattedDate;
  }

  setHours(hours) {
    this._dueDate = setHours(this._dueDate, hours);
    console.log(this._dueDate);
  }
  setMinutes(minutes) {
    this._dueDate = setMinutes(this._dueDate, minutes);
  }
  getCompleted() {
    return this._completed;
  }
  getDueMonth() {
    return format(this._dueDate, "MMMM");
  }
  getDueDayOfMonth() {
    return getDate(this._dueDate);
  }
  hasTime() {
    return this._hasTime;
  }
  setTimeShown(value) {
    this._hasTime = value;
  }
  getHours() {
    return this._dueDate.getHours();
  }
  getMinutes() {
    return this._dueDate.getMinutes();
  }
  setReloadTimeFunc(func) {
    this._reloadFunc = func;
  }
  reloadDate() {
    this._reloadFunc();
  }
  setNewDay(month, day) {
    this._dueDate = setDate(this._dueDate, day);
    this._dueDate = setMonth(this._dueDate, month);
  }
}

export default Task;
