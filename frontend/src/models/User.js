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
  constructor(
    id,
    name,
    email,
    password,
    fitnessLevel,
    weight,
    height,
    picture
  ) {
    super("users");
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.fitnessLevel = fitnessLevel;
    this.weight = weight;
    this.height = height;
    this.picture = picture;
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
      picture: "https://picsum.photos/200/300",
      latitude: 0,
      longitude: 0,
    };
  }
  static fromJson(json) {
    return new User(
      json.id,
      json.name,
      json.email,
      json.password,
      json.fitness_level,
      json.weight,
      json.height,
      json.picture
    );
  }
  static async get(id = null) {
    const resp = await super.get("users", id);
    if (resp.status === 200) {
      return resp.data.map((user) => User.fromJson(user));
    }
    return [];
  }
  static async add(
    name,
    email,
    password,
    fitnessLevel,
    weight,
    height,
    picture
  ) {
    const u = new User(
      null,
      name,
      email,
      password,
      fitnessLevel,
      weight,
      height,
      picture
    );
    return super.add(u.modelEndPointUrl, u.toJson());
  }
  delete() {
    return super.delete(this.id);
  }
  update() {
    return super.update(this.id, this.toJson());
  }
  static async getHistory(id) {
    const resp = await super.get("users_history", id);
    if (resp.status === 200) {
      return resp.data.map((user) => User.fromJson(user));
    }
    return [];
  }
  static async getFriends(id) {
    const resp = await super.get("users", id + "/friends");
    if (resp.status === 200) {
      return resp.data.map((user) => User.fromJson(user));
    }
    return [];
  }
  static async getActive() {
    const resp = await super.get("users", "active/6");
    console.log(resp);
    if (resp.status === 200) {
      return resp.data.map((user) => {
        return { user: User.fromJson(user.user), count: user.count };
      });
    }
  }
}
