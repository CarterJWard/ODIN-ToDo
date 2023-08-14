function TaskList(tasks) {
  const parent = document.createElement("div");

  const formattedTasks = tasks.map((task) => {
    const element = document.createElement("p");
    element.textContent = task.getName();
    return element;
  });

  for (const task of formattedTasks) {
    parent.appendChild(task);
  }
  return parent;
}

export default TaskList;
