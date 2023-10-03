import CalendarSelection from "./CalendarSelection";
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

    const due = document.createElement("p");
    due.textContent = task.getDue();

    task.setReloadTimeFunc(() => {
      due.textContent = task.getDue();
    });

    const setButton = document.createElement("button");
    setButton.textContent = "set time";
    setButton.addEventListener("click", (event) => {
      calendar.switchCalendar(task);
      calendar.setPos(event.clientX, event.clientY);
    });
    const c1 = document.createElement("td");
    c1.appendChild(completed);

    const c2 = document.createElement("td");
    c2.appendChild(name);

    const c3 = document.createElement("td");
    c3.appendChild(description);

    const c4 = document.createElement("td");
    c4.appendChild(due);

    const c5 = document.createElement("td");
    c5.appendChild(setButton);

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);

    return row;
  });
  const table = TaskTable();

  for (const task of formattedTasks) {
    table.appendChild(task);
  }

  const calendar = new CalendarSelection(tasks[0]);
  const testButton = document.createElement("button");
  parent.appendChild(table);
  console.log(calendar);
  if (calendar) {
    parent.appendChild(calendar.getElement());
  }

  return parent;
}

export default TaskList;
