import { getDaysInMonth, getDay, format } from "date-fns";

class CalendarSelection {
  constructor(task) {
    this._shown = false;
    this._task = task;
    this._currentTask = task;
    this._currentSelectedDate = this._task.getRawDue();
    this._shownMonth = new currentMonth(
      task,
      task.getRawDue().getFullYear(),
      task.getRawDue().getMonth()
    );

    this._parent = document.createElement("div");
    this._heading = document.createElement("h1");
    this._parent.appendChild(this._heading);
    this._parent.classList.add("disabled");
    this._parent.id = "calendar";

    const last = document.createElement("button");
    last.textContent = "Last Month";
    last.onclick = () => {
      this._shownMonth.prevMonth();
      this.redraw();
    };

    const next = document.createElement("button");
    next.textContent = "Next Month";
    next.onclick = () => {
      this._shownMonth.nextMonth();
      this.redraw();
    };
    this._table = createTable(this._task, this._shownMonth);
    this._parent.appendChild(last);
    this._parent.appendChild(next);
    this._parent.appendChild(this._table);
    this.redraw();
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

  setCalendarMonth() {
    this.redraw();
  }
  redraw() {
    this._heading.textContent = this._shownMonth.monthTitle;
    this._parent.removeChild(this._table);
    this._table = createTable(this._task, this._shownMonth);
    this._parent.appendChild(this._table);
  }
}

class currentMonth {
  constructor(task, year, month) {
    this.newMonth = new Date(year, month, 1);
    this.month = month;
    this.year = year;
    this.offset;
    this.numDays;
    this.monthTitle;
    this.refreshVars();
  }
  prevMonth() {
    this.month--;
    if (this.month == 11) {
      newMonth = 0;
      this.year++;
    } else if (this.month == -1) {
      this.month = 11;
      this.year--;
    }
    this.newMonth = new Date(this.year, this.month, 1);
    this.refreshVars();
  }
  nextMonth() {
    this.month++;
    if (this.month == 12) {
      this.month = 0;
      this.year++;
    }
    this.newMonth = new Date(this.year, this.month, 1);
    this.refreshVars();
  }
  refreshVars() {
    this.offset = getDay(this.newMonth);
    this.numDays = getDaysInMonth(this.newMonth);
    this.monthTitle = format(this.newMonth, "MMMM");
  }
}

function createTable(task, month) {
  const tableElement = document.createElement("table");
  const headingRow = document.createElement("tr");
  const selectedDay = task.getDueDayOfMonth();
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  console.log("redrawn");

  for (const day of days) {
    const header = document.createElement("th");
    header.textContent = day;
    headingRow.appendChild(header);
  }

  let count = 1;
  let cellPos = 1;
  let row = document.createElement("tr");

  while (count <= month.numDays) {
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
  return tableElement;
}

export default CalendarSelection;
