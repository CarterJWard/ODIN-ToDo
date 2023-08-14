import Sidebar from "./components/Sidebar";
import "./global.css";
function App() {
  const text = document.createElement("h1");
  text.textContent = "To Do Application";
  document.body.appendChild(Sidebar());
  document.body.appendChild(text);
}
App();
