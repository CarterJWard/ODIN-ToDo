import "../global.css";
import Input from "./Input";
import SidebarElements from "./SidebarElements";

function Sidebar(projects, reload) {
  const parent = document.createElement("nav");
  parent.id = "sidebar";
  parent.classList.add("sidebar");

  const headingElement = document.createElement("div");
  const headingText = document.createElement("h1");
  headingElement.classList.add("navHeader");
  headingText.textContent = "Projectly";
  headingElement.appendChild(headingText);

  const menuItems = SidebarElements(projects);
  const input = Input();

  const addButton = document.createElement("button");
  addButton.textContent = "Create a new project";
  addButton.onclick = () => {
    projects.addProject(input.getValue());
    reload();
  };

  console.log(input.getValue());

  parent.appendChild(headingElement);
  for (const element of menuItems) {
    parent.appendChild(element);
  }
  parent.appendChild(addButton);
  parent.appendChild(input.element);
  return parent;
}

export default Sidebar;
