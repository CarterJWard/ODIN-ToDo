function TaskTable() {
  const table = document.createElement("table");
  const row = document.createElement("tr");
  const done = document.createElement("th");
  const name = document.createElement("th");
  const description = document.createElement("th");
  const due = document.createElement("th");

  done.textContent = "Complete";
  name.textContent = "Name";
  description.textContent = "Description";
  due.textContent = "Due";

  table.appendChild(row);
  row.appendChild(done);
  row.appendChild(name);
  row.appendChild(description);
  row.appendChild(due);

  return table;
}

export default TaskTable;
