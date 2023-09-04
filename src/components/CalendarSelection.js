import { getDaysInMonth, getDay } from "date-fns";

class CalendarSelection {
  constructor(task) {
    this._shown = false;
    this._currentTask = task;
    this._currentMonth = new currentMonth(
      task,
      task.getRawDue().getFullYear(),
      task.getRawDue().getMonth()
    );

    this._shownMonth = this._parent = document.createElement("div");
    this._heading = document.createElement("h1");
    this._heading.textContent = task.getDueMonth();
    this._parent.appendChild(this._heading);
    this._parent.classList.add("disabled");
    this._parent.id = "calendar";

    const last = document.createElement("button");
    last.textContent = "Last Month";

    const next = document.createElement("button");
    next.textContent = "Next Month";

    const table = createTable(task, this._currentMonth);
    this._parent.appendChild(last);
    this._parent.appendChild(next);
    this._parent.appendChild(table);
  }

  switchCalendar() {
    const parent = document.getElementById("calendar");
    if (this._shown) {
      parent.classList.add("disabled");
      parent.classList.remove("enabled");
      this._shown = false;
    } else {
      parent.classList.remove("disabled");
      parent.classList.add("enabled");
      this._shown = true;
    }
  }
  getElement() {
    return this._parent;
  }
  setCalendarMonth() {}
}

class currentMonth {
  constructor(task, year, month) {
    const newMonth = new Date(year, month, 1);
    this.offset = getDay(newMonth);
    this.numDays = getDaysInMonth(newMonth);
  }
}

function createTable(task, month) {
  const tableElement = document.createElement("table");
  const headingRow = document.createElement("tr");
  const selectedDay = task.getDueDayOfMonth();
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  for (const day of days) {
    const header = document.createElement("th");
    header.textContent = day;
    headingRow.appendChild(header);
  }

  let count = 1;
  let cellPos = 1;
  let row = document.createElement("tr");
  let rows = [];
  console.log(month.numDays);

  while (count <= month.numDays) {
    console.log(month.offset);
    const item = document.createElement("td");
    if (count == selectedDay) {
      item.id = "selectedDay";
    }
    if (month.offset > 0) {
      month.offset--;
      item.textContent = "";
    } else {
      item.textContent = count;
      count++; //counter on increases once the offset has been reached
    }
    cellPos++;
    row.appendChild(item);

    if (cellPos >= 8) {
      tableElement.appendChild(row);
      row = document.createElement("tr");
      cellPos = 1;
    }
  }
  /*
  rows.push(row);
  tableElement.appendChild(headingRow);
  for (const row of rows) {
    tableElement.appendChild(row);
  }
  */

  return tableElement;
}

export default CalendarSelection;
