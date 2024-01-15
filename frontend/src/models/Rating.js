import Entity from "./Entity";
const RATING_URL = "rating";
export default class Rating extends Entity {
  constructor(userId, exerciseId, exerciseName, rating, desctiption, time) {
    super(RATING_URL);
    this.userId = userId;
    this.exerciseId = exerciseId;
    this.exerciseName = exerciseName;
    this.rating = rating;
    this.desctiption = desctiption;
    this.time = time;
  }
  static async get(id) {
    const resp = await super.get(RATING_URL, id);
    if (resp.status === 200) {
      return resp.data.map((rating) => Rating.fromJson(rating));
    }
    return [];
  }
  toJson() {
    return {
      user_id: this.userId,
      exercise_id: this.exerciseId,
      exercise_name: this.exerciseName,
      rating: this.rating,
      description: this.desctiption,
      time: this.time,
    };
  }
  static fromJson(json) {
    return new Rating(
      json.user_id,
      json.exercise_id,
      json.exercise_name,
      json.rating,
      json.description,
      json.time
    );
  }
}
