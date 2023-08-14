import Project from "./project";
class ProjectList {
  constructor(name) {
    this._projects = [];
    this._currentID = 1;
    this.addProject(name);
  }
  addProject(title) {
    const newProject = new Project(title, this._currentID);
    this._currentID++;
    this._projects.push(newProject);
  }
  getAll() {
    return this._projects;
  }
  getSelectedProject(id) {
    const selected = this._projects.filter((project) => project._id == id);
    return selected[0];
  }
}
export default ProjectList;
