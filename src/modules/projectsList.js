import Project from "./project";
class ProjectList {
  constructor(name) {
    this._projects = [];
    this._projects.push(new Project(name));
  }
  addProject(title) {
    const newProject = new Project(title);
    this._projects.push(newProject);
  }
  getAll() {
    return this._projects;
  }
}
export default ProjectList;
