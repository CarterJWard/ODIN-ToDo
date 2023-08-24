import TaskList from "./TaskList";
function ProjectView(projects, reload) {
  const selectedProject = projects.getSelectedProject();
  const parent = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = selectedProject.getName();

  const taskList = TaskList(selectedProject.getTasks(), reload);
  const input = document.createElement("input");
  input.placeholder = "task name";
  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Create Task";
  addTaskButton.onclick = () => {
    selectedProject.addTask(input.value);
    reload();
  };

  parent.appendChild(title);
  parent.appendChild(taskList);
  parent.appendChild(input);
  parent.appendChild(addTaskButton);
  return parent;
}

export default ProjectView;
