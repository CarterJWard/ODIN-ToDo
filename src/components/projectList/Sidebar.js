import "./style.css";
import ProjectList from "../../modules/projectsList";
function Sidebar() {
  const projects = new ProjectList();
  const parent = document.createElement("nav");
  parent.classList.add("sidebar");

  const headingElement = document.createElement("div");
  const headingText = document.createElement("p");
  headingElement.classList.add("navHeader");
  headingText.textContent = "Projectly";
  headingElement.appendChild(headingText);

  parent.appendChild(headingElement);
  return parent;
}

export default Sidebar;
