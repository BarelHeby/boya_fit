import Entity from "./Entity";
export default class Eqipments extends Entity {
  /**
   *
   * @param {int} id equipment id
   * @param {string} name equipment name
   */
  constructor(id, name) {
    super("equipments");
    this.id = id;
    this.name = name;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
  fromJson(json) {
    return new Eqipments(json.id, json.name);
  }
  add() {
    return super.add(this.toJson());
  }
  delete() {
    return super.delete(this.id);
  }
  update() {
    return super.update(this.id, this.toJson());
  }
}
