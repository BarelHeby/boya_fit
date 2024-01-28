import Entity from "./Entity";
import Exercise from "./Exercise";
export default class UserHistory extends Entity {
  constructor(userId, time, exercise, bodyPart) {
    super("users_history");
    this.userId = userId;
    this.time = time;
    this.exercise = exercise;
    this.bodyPart = bodyPart;
  }
  static fromJson(json) {
    return new UserHistory(
      json.user_id,
      json.time,
      Exercise.fromJson(json.exercise),
      json.body_part
    );
  }
  static async get(id) {
    const resp = await super.get("users_history", id);
    if (resp.status === 200) {
      return resp.data.map((user) => UserHistory.fromJson(user));
    }
    return [];
  }

  static async post(userId, exerciseId) {
    const resp = await super.post("users_history/", {
      userId,
      exerciseId,
    });
    if (resp.status === 200) {
      return true;
    }
    return false;
  }
}
