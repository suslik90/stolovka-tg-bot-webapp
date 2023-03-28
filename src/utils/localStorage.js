class localStorage {
  local = window.localStorage;

  constructor() { }

  set(name, value) {
    return this.local.setItem(name, value);
  }

  get(name) {
    return this.local.getItem(name) || '';
  }

  setObject(name, value) {
    return this.local.setItem(name, JSON.stringify(value));
  }

  getObject(name) {
    return JSON.parse(this.local.getItem(name) || '{}');
  }

  deleteItem(name) {
    return this.local.removeItem(name);
  }

  clear() {
    this.local.clear();
  }
}

export default new localStorage;