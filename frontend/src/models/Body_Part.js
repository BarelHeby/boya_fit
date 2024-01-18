import Entity from "./Entity";
export default class BodyPart extends Entity {
  /**
   *
   * @param {int} id body part id
   * @param {string} name body part name
   */
  constructor(id, name) {
    super("body_parts");
    this.id = id;
    this.name = name;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
  static fromJson(json) {
    if (!json) return null;
    return new BodyPart(json.id, json.name);
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
