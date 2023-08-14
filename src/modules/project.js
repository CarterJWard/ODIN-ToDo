import Task from "./task";

class Project {
  constructor(name, id) {
    this._name = name;
    this._tasks = [];
    this._id = id;
  }
  getName() {
    return this._name;
  }
  addTask(name) {
    const task = new Task(name);
    this._tasks.push(task);
  }
  getTasks() {
    return this._tasks;
  }
  getID() {
    return this._id;
  }
}
export default Project;
