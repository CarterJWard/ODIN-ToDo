class CalendarSelection {
  constructor(task) {
    this._shown = false;
    this._currentTask = task;

    this._parent = document.createElement("div");
    this._heading = document.createElement("h1");
    this._heading.textContent = task.getDueMonth();
    this._parent.appendChild(this._heading);
    this._parent.classList.add("disabled");
    this._parent.id = "calendar";

    function createTable() {
      const tableElement = document.createElement("table");
      const headingRow = document.createElement("tr");
      const days = ["M", "T", "W", "Thu", "F", "S", "Sun"];
      for (const day of days) {
        const header = document.createElement("th");
        header.textContent = day;
        headingRow.appendChild(header);
      }

      console.log(task.getNumberOfDays());
      tableElement.appendChild(headingRow);
      return tableElement;
    }
    const table = createTable();
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
}

export default CalendarSelection;
