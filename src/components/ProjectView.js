function ProjectView(project) {
  const parent = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = project.getName();

  parent.appendChild(title);
  return parent;
}

export default ProjectView;
