import Entity from "./Entity";
export default class User extends Entity {
  /**
   * @param {int} id user id
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} password user password
   * @param {int} fitnessLevel user fitness level
   * @param {int} weight user weight
   * @param {int} height user height
   */
  constructor(id, name, email, password, fitnessLevel, weight, height) {
    super("users");
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.fitnessLevel = fitnessLevel;
    this.weight = weight;
    this.height = height;
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      fitnessLevel: this.fitnessLevel,
      weight: this.weight,
      height: this.height,
    };
  }
  static fromJson(json) {
    return new User(
      json.id,
      json.name,
      json.email,
      json.password,
      json.fitnessLevel,
      json.weight,
      json.height
    );
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
