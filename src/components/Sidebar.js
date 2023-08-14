import "../global.css";
import ProjectList from "../modules/projectsList";
function Sidebar() {
  const projects = new ProjectList("First Project");
  const parent = document.createElement("nav");
  parent.classList.add("sidebar");

  const headingElement = document.createElement("div");
  const headingText = document.createElement("h1");
  headingElement.classList.add("navHeader");
  headingText.textContent = "Projectly";
  headingElement.appendChild(headingText);

  const menuElements = projects.getAll().map((item) => {
    const element = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = item.getName();
    element.appendChild(text);
    return element;
  });

  console.log(menuElements);

  parent.appendChild(headingElement);
  for (const element of menuElements) {
    parent.appendChild(element);
  }
  return parent;
}

export default Sidebar;
