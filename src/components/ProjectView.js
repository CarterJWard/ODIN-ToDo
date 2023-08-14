import TaskList from "./TaskList";
function ProjectView(projects) {
  const selectedProject = projects.getSelectedProject();
  const parent = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = selectedProject.getName();

  const taskList = TaskList(selectedProject.getTasks());

  parent.appendChild(title);
  parent.appendChild(taskList);
  return parent;
}

export default ProjectView;
