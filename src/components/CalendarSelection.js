import { getDaysInMonth, getDay, format } from "date-fns";
function timeSlider(task) {
  const parent = document.createElement("div");
  const timeSlider = document.createElement("input");
  timeSlider.type = "checkbox";
  timeSlider.checked = task.hasTime();
  timeSlider.name = "showTime";
  timeSlider.addEventListener("click", () => {
    task.setTimeShown(timeSlider.checked);
    const timeSelection = document.querySelector("#timeSelector");
    timeSlider.checked
      ? timeSelection.classList.remove("disabled")
      : timeSelection.classList.add("disabled");
    task.reloadTime();
  });
  const label = document.createElement("label");
  label.for = "showTime";
  label.textContent = "Has time";
  parent.appendChild(timeSlider);
  parent.appendChild(label);
  return parent;
}
function createTime(shown, task) {
  let isPM = false;
  const parent = document.createElement("div");
  parent.id = "timeSelector";
  if (shown) {
  } else {
    parent.classList.add("disabled");
  }

  const hourInput = document.createElement("input");
  hourInput.type = "number";
  hourInput.max = 12;
  hourInput.min = 0;
  hourInput.placeholder = "hour";
  hourInput.value = task.getHours() % 12;

  const minInput = document.createElement("input");
  minInput.type = "number";
  minInput.max = 59;
  minInput.min = 0;
  minInput.placeholder = "Minute";
  minInput.value = task.getMinutes();

  hourInput.addEventListener("blur", () => {
    let hour = hourInput.value;
    if (amPMCheck.checked >= 0 && hour <= 12) {
      if (isPM) {
        hour += 12;
      }
      task.setHours(hour);
    } else {
      hourInput.value = task.getHours();
    }
  });

  minInput.addEventListener("blur", () => {
    if (minInput.value >= 0 && minInput.value <= 59) {
      task.setMinutes(minInput.value);
    }
    minInput.value = task.getMinutes();
    console.log(task);
  });

  const amPMCheck = document.createElement("input");
  amPMCheck.type = "checkbox";
  amPMCheck.name = "amPMCheck";
  amPMCheck.checked = task.getHours() > 12;

  const checkLabel = document.createElement("label");
  checkLabel.for = "amPmCheck";
  checkLabel.textContent = "AM - PM";

  parent.appendChild(hourInput);
  parent.appendChild(minInput);
  parent.appendChild(amPMCheck);
  parent.appendChild(checkLabel);
  return parent;
}

function nextButton(shownMonth, item) {
  const button = document.createElement("button");
  button.textContent = "Next Month";
  button.onclick = () => {
    shownMonth.nextMonth();
    item.redraw();
  };
  return button;
}

function prevButton(shownMonth, item) {
  const button = document.createElement("button");
  button.textContent = "Last Month";
  button.onclick = () => {
    shownMonth.prevMonth();
    item.redraw();
  };
  return button;
}

class CalendarSelection {
  constructor(task) {
    this._shown = false;
    this._task = task;
    this._currentTask = task;
    this._currentSelectedDate = this._task.getRawDue();
    this.shownMonth = new currentMonth(
      task.getRawDue().getFullYear(),
      task.getRawDue().getMonth()
    );

    this._parent = document.createElement("div");
    this._heading = document.createElement("h1");
    this._parent.appendChild(this._heading);
    this._parent.classList.add("disabled");
    this._parent.id = "calendar";

    const prevButtonElement = prevButton(this.shownMonth, this);
    const nextButtonElement = nextButton(this.shownMonth, this);
    const timeSliderElement = timeSlider(this._task);
    const timeSelector = createTime(this._task.hasTime(), this._task);

    this._table = createTable(this._task, this.shownMonth);
    this._parent.appendChild(prevButtonElement);
    this._parent.appendChild(nextButtonElement);
    this._parent.appendChild(timeSliderElement);
    this._parent.appendChild(timeSelector);
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
    this._heading.textContent = this.shownMonth.monthTitle;
    this._parent.removeChild(this._table);
    this._table = createTable(this._task, this.shownMonth);
    this._parent.appendChild(this._table);
  }
}

class currentMonth {
  constructor(year, month) {
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
    if (month.month == task.getRawDue().getMonth() && count == selectedDay) {
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
