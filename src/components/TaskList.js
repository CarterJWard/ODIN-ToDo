function TaskList(tasks) {
  const parent = document.createElement("div");

  const formattedTasks = tasks.map((task) => {
    const parent = document.createElement("div");

    const name = document.createElement("p");
    name.textContent = task.getName();

    const description = document.createElement("input");
    description.value = task.getDescription();
    description.placeholder = "Add Description";
    description.onchange = () => task.setDescription(description.value);

    const time = document.createElement("p");
    time.textContent = task.getDue();

    parent.appendChild(name);
    parent.appendChild(description);
    parent.appendChild(time);
    return parent;
  });

  for (const task of formattedTasks) {
    parent.appendChild(task);
  }
  return parent;
}

export default TaskList;
