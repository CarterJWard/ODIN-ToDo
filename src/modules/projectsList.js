import Project from "./project";
class ProjectList {
  constructor(name) {
    this._projects = [];
    this._currentID = 1;
    this._selectedID = 1;
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
  getSelectedProject() {
    const selected = this._projects.filter(
      (project) => project._id == this._selectedID
    );
    return selected[0];
  }
  setSelectedProject(id) {
    this._selectedID = id;
  }
}
export default ProjectList;
