import Sidebar from "./components/Sidebar";
import ProjectList from "./modules/projectsList";
import "./global.css";
import ProjectView from "./components/ProjectView";

function App() {
  //Setup some basic starting data
  const projects = new ProjectList("First Project");
  projects.getSelectedProject().addTask("First Task");

  const text = document.createElement("h1");
  text.textContent = "To Do Application";

  function reload() {
    document.body.innerHTML = null;
    draw();
  }
  function draw() {
    document.body.appendChild(Sidebar(projects, reload));
    document.body.appendChild(ProjectView(projects));
  }
  draw();
}
App();
