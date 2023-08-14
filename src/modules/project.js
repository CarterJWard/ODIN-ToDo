class Project {
  constructor(name) {
    this._name = name;
    this._items = [];
  }
  getName() {
    return this._name;
  }
}
export default Project;
