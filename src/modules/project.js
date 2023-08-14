class Project {
  constructor(name, id) {
    this._name = name;
    this._items = [];
    this._id = id;
  }
  getName() {
    return this._name;
  }
}
export default Project;
