function SidebarElements(projects) {
  const menuElements = projects.getAll().map((item) => {
    const element = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = item.getName();
    element.appendChild(text);
    return element;
  });
  return menuElements;
}

export default SidebarElements;
