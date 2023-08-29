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
      const days = ["S", "M", "T", "W", "T", "F", "S"];
      for (const day of days) {
        const header = document.createElement("th");
        header.textContent = day;
        headingRow.appendChild(header);
      }

      let count = 1;
      let cellPos = 1;
      let offset = task.getFirstDay();
      let row = document.createElement("tr");
      let rows = [];

      while (count <= task.getNumberOfDays()) {
        console.log(count);

        const item = document.createElement("td");
        if (offset > 0) {
          offset--;
          item.textContent = "";
        } else {
          item.textContent = count;
          count++; //counter on increases once the offset has been reached
        }

        cellPos++;
        row.appendChild(item);

        if (cellPos >= 8) {
          rows.push(row);
          row = document.createElement("tr");
          cellPos = 1;
          console.log("reset ", count);
        }
      }
      rows.push(row);
      tableElement.appendChild(headingRow);
      for (const row of rows) {
        tableElement.appendChild(row);
      }
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
