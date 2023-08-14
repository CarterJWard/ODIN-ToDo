function SidebarElements(projects, reload) {
  const menuElements = projects.getAll().map((item) => {
    const element = document.createElement("div");
    element.onclick = () => {
      projects.setSelectedProject(item.getID());
      reload();
    };
    const text = document.createElement("p");
    text.textContent = item.getName();
    element.appendChild(text);
    return element;
  });
  return menuElements;
}

export default SidebarElements;
