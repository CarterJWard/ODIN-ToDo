import TaskTable from "./TaskTable";
function TaskList(tasks, reload) {
  const parent = document.createElement("div");

  const formattedTasks = tasks.map((task) => {
    const row = document.createElement("tr");

    const completed = document.createElement("input");
    completed.type = "checkbox";
    function changeHandler() {
      if (completed.checked) {
        task.complete();
        reload();
      } else {
        task.unComplete();
        reload();
      }
    }

    completed.onchange = changeHandler;
    completed.checked = task.getCompleted();

    const name = document.createElement("p");
    name.textContent = task.getName();
    if (task.getCompleted()) {
      name.classList.add("completed");
    }

    const description = document.createElement("input");
    description.value = task.getDescription();
    description.placeholder = "Add Description";
    description.onchange = () => task.setDescription(description.value);

    const time = document.createElement("p");
    time.textContent = task.getDue();

    const c1 = document.createElement("td");
    c1.appendChild(completed);

    const c2 = document.createElement("td");
    c2.appendChild(name);

    const c3 = document.createElement("td");
    c3.appendChild(description);

    const c4 = document.createElement("td");
    c4.appendChild(time);

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);

    return row;
  });
  const table = TaskTable();

  for (const task of formattedTasks) {
    table.appendChild(task);
  }
  parent.appendChild(table);
  return table;
}

export default TaskList;
