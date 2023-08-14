import Sidebar from "./components/Sidebar";
import ProjectList from "./modules/projectsList";
import "./global.css";
import ProjectView from "./components/ProjectView";

function App() {
  const projects = new ProjectList("First Project");
  const text = document.createElement("h1");
  text.textContent = "To Do Application";
  function reload() {
    document.body.innerHTML = null;
    draw();
  }
  function draw() {
    document.body.appendChild(Sidebar(projects, reload));
    document.body.appendChild(ProjectView(projects.getSelectedProject(1)));
  }
  draw();
}
App();
