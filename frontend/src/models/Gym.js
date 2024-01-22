import Entity from "./Entity";

export default class Gym extends Entity {
  constructor(
    name,
    city,
    country,
    countryShortCode,
    isKids,
    isActive,
    logo,
    distance = null
  ) {
    super("gyms");
    this.name = name;
    this.city = city;
    this.country = country;
    this.countryShortCode = countryShortCode;
    this.isKids = isKids;
    this.isActive = isActive;
    this.logo = logo;
    this.distance = distance;
  }
  toJson() {
    return {
      name: this.name,
      city: this.city,
      country: this.country,
      countryShortCode: this.countryShortCode,
      isKids: this.isKids,
      isActive: this.isActive,
      logo: this.logo,
    };
  }
  static fromJson(json) {
    return new Gym(
      json.name,
      json.city,
      json.country,
      json.countryShortCode,
      json.isKids,
      json.isActive,
      json.logo
    );
  }
  static async get_by_user_exercise(userId, exerciseId) {
    const resp = await super.get("gyms/exercise", `${userId}/${exerciseId}`);
    if (resp.status !== 200) {
      return null;
    }
    return resp.data;
  }
}
