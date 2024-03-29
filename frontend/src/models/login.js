import Entity from "./Entity";
const LOGINPATH = "users/login/";
export default class Login extends Entity {
  constructor(email, password) {
    super(LOGINPATH);
    this.email = email;
    this.password = password;
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  fromJson(json) {
    return new Login(json.email, json.password);
  }

  async add() {
    return await Entity.post(LOGINPATH, this.toJson());
  }

  async delete() {
    return await super.delete(this.id);
  }

  async update() {
    return await super.update(this.id, this.toJson());
  }
}
