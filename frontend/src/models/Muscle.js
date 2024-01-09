import Entity from "./Entity";
export default class Muscle extends Entity {
  /**
   * @param {int} id muscle id
   * @param {string} name muscle name
   * @param {int} bodyPartId body part id
   */
  constructor(id, name, bodyPartId) {
    super("muscles");
    this.id = id;
    this.name = name;
    this.bodyPartId = bodyPartId;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      bodyPartId: this.bodyPartId,
    };
  }
  fromJson(json) {
    return new Muscle(json.id, json.name, json.bodyPartId);
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
