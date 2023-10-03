import { getDaysInMonth, getDay, format } from "date-fns";

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
    task.reloadDate();
  });

  minInput.addEventListener("blur", () => {
    if (minInput.value >= 0 && minInput.value <= 59) {
      task.setMinutes(minInput.value);
    }
    minInput.value = task.getMinutes();
    task.reloadDate();
  });

  const amPMCheck = document.createElement("input");
  amPMCheck.type = "checkbox";
  amPMCheck.name = "amPMCheck";
  amPMCheck.checked = task.getHours() > 12;
  amPMCheck.addEventListener("click", () => {
    if (amPMCheck.checked) {
      task.setHours(task.getHours() + 12);
    } else {
      task.setHours(task.getHours() - 12);
    }
    task.reloadDate();
  });

  const checkLabel = document.createElement("label");
  checkLabel.for = "amPmCheck";
  checkLabel.textContent = "AM - PM";

  parent.appendChild(hourInput);
  parent.appendChild(minInput);
  parent.appendChild(amPMCheck);
  parent.appendChild(checkLabel);
  return parent;
}

class CalendarSelection {
  constructor(task) {
    this._shown = false;
    this._task = task;
    if (!task) {
      return;
    }
    this._currentSelectedDate = this._task.getRawDue();
    this.shownMonth = new currentMonth(
      task.getRawDue().getFullYear(),
      task.getRawDue().getMonth()
    );
    this._table;

    this._parent = document.createElement("div");
    this._heading = document.createElement("h1");
    this._parent.appendChild(this._heading);
    this._parent.classList.add("disabled");
    this._parent.id = "calendar";

    const prevButtonElement = this.prevButton();
    const nextButtonElement = this.nextButton();
    const timeSliderElement = this.timeSlider();
    const timeSelector = createTime(this._task.hasTime(), this._task);

    this._parent.appendChild(prevButtonElement);
    this._parent.appendChild(nextButtonElement);
    this._parent.appendChild(timeSliderElement);
    this._parent.appendChild(timeSelector);
    this.redraw();
  }

  switchCalendar(task) {
    if (!task) {
      return;
    }
    function handleClick(event) {
      console.log(this._parent);
      /*
      if (this._parent.contains(event.target)) {
        //calendar action
      } else {
        this.switchCalendar(this._task);
      */
    }

    const parent = document.getElementById("calendar");
    this._task = task;
    this._currentSelectedDate = this._task.getRawDue();
    this.shownMonth = new currentMonth(
      this._task.getRawDue().getFullYear(),
      this._task.getRawDue().getMonth()
    );
    if (this._shown) {
      parent.classList.add("disabled");
      parent.classList.remove("enabled");
      this._shown = false;
      document.removeEventListener("click", handleClick);
    } else {
      parent.classList.remove("disabled");
      parent.classList.add("enabled");
      this._shown = true;
      document.addEventListener("click", handleClick);
    }
    this.redraw();
  }
  getElement() {
    if (!this._task) {
      return document.createElement("div");
    }
    return this._parent;
  }

  setCalendarMonth() {
    this.redraw();
  }

  redraw() {
    //add the time sliders and inputs to be flushed here
    if (this._table) {
      this._parent.removeChild(this._table);
    }
    this._heading.textContent = this.shownMonth.monthTitle;
    this._table = this.createTable();
    this._parent.appendChild(this._table);
  }
  createTable() {
    const tableElement = document.createElement("table");
    const headingRow = document.createElement("tr");
    const selectedDay = this._task.getDueDayOfMonth();
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    let currentOffset = this.shownMonth.offset;

    for (const day of days) {
      const header = document.createElement("th");
      header.textContent = day;
      headingRow.appendChild(header);
    }
    tableElement.appendChild(headingRow);

    let count = 1;
    let cellPos = 1;
    let row = document.createElement("tr");

    while (count <= this.shownMonth.numDays) {
      const item = document.createElement("td");
      if (
        this.shownMonth.month == this._task.getRawDue().getMonth() &&
        count == selectedDay
      ) {
        item.id = "selectedDay";
      }
      if (currentOffset > 0) {
        currentOffset--;
        item.textContent = "";
      } else {
        const thisItemCount = count;
        item.textContent = count;
        count++;
        item.onclick = () => {
          this._task.setNewDay(this.shownMonth.month, thisItemCount);
          this._task.reloadDate();
          this.redraw();
        };
      }
      cellPos++;
      row.appendChild(item);

      if (cellPos >= 8) {
        tableElement.appendChild(row);
        row = document.createElement("tr");
        cellPos = 1;
      } else if (count == this.shownMonth.numDays) {
        tableElement.appendChild(row);
      }
    }
    return tableElement;
  }
  timeSlider() {
    const parent = document.createElement("div");
    const timeSlider = document.createElement("input");
    timeSlider.type = "checkbox";
    timeSlider.checked = this._task.hasTime();
    timeSlider.name = "showTime";
    timeSlider.addEventListener("click", () => {
      this._task.setTimeShown(timeSlider.checked);
      const timeSelection = document.querySelector("#timeSelector");
      timeSlider.checked
        ? timeSelection.classList.remove("disabled")
        : timeSelection.classList.add("disabled");
      this._task.reloadDate();
    });
    const label = document.createElement("label");
    label.for = "showTime";
    label.textContent = "Has time";
    parent.appendChild(timeSlider);
    parent.appendChild(label);
    return parent;
  }
  nextButton() {
    const button = document.createElement("button");
    button.textContent = "Next Month";
    button.onclick = () => {
      this.shownMonth.nextMonth();
      this.redraw();
    };
    return button;
  }
  prevButton() {
    const button = document.createElement("button");
    button.textContent = "Last Month";
    button.onclick = () => {
      this.shownMonth.prevMonth();
      this.redraw();
    };
    return button;
  }
  setPos(x, y) {
    this._parent.style.left = x + "px";
    this._parent.style.top = y + "px";
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

export default CalendarSelection;
