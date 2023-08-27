import { format, setHours, setMinutes } from "date-fns";
class Task {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._dueDate = new Date();
    this._priority;
    this._completed = false;
    this._hasTime = false;
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
    let formattedDate = `${format(this._dueDate, "P")}`;
    if (this._hasTime) {
      formattedDate += ` ${format(this._dueDate, "p")}`;
    }

    return formattedDate;
  }
  setDueTime(hours, minutes) {
    this._hasTime = true;
    const hoursFormat = setHours(this._dueDate, hours);
    const minutesFormat = setMinutes(hoursFormat, minutes);
    this._dueDate = minutesFormat;
  }
  getCompleted() {
    return this._completed;
  }
}

export default Task;
