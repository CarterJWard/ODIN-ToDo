import { format, setHours, setMinutes, getDaysInMonth, getDay } from "date-fns";
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
  getDueMonth() {
    return format(this._dueDate, "MMMM");
  }
  getNumberOfDays() {
    return getDaysInMonth(this._dueDate);
  }
  getFirstDay() {
    const firstDay = new Date(
      this._dueDate.getFullYear(),
      this._dueDate.getMonth(),
      1
    );
    console.log(firstDay);
    return getDay(firstDay);
  }

  /*

// Suppose this is your existing date
const existingDate = new Date(2023, 5, 15);  // June 15, 2023

// Create a new date for the first day of the existing date's month
const firstOfMonth = new Date(existingDate.getFullYear(), existingDate.getMonth(), 1);

const dayOfWeek = format(firstOfMonth, 'EEEE');

console.log(dayOfWeek);  // Outputs: "Thursday" for June 1, 2023
*/
}

export default Task;
