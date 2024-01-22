import Entity from "./Entity";
import Muscle from "./Muscle";
import BodyPart from "./Body_Part";
import Equipment from "./Eqipment";
export default class Exercise extends Entity {
  /**
   *
   * @param {int} id Exercise id
   * @param {string} name Exercise name
   * @param {int} difficulty Exercise difficulty
   * @param {int} calories Calories burned
   * @param {int} timeSeconds Time to complete exercise in seconds
   * @param {int} equipmentId Equipment id
   * @param {int} bodyPartId Body part id
   * @param {Instruction[]} instructions Array of instructions
   */
  constructor(
    id,
    name,
    difficulty,
    calories,
    timeSeconds,
    equipmentId,
    bodyPartId,
    instructions,
    bodyPartName = null,
    equipmentName = null,
    muscles = [],
    rating = null
  ) {
    super("exercises");
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.calories = calories;
    this.timeSeconds = timeSeconds;
    this.equipmentId = equipmentId;
    this.bodyPartId = bodyPartId;
    this.instructions = instructions;
    this.bodyPartName = bodyPartName;
    this.equipmentName = equipmentName;
    this.muscles = muscles;
    this.bodyPartName = bodyPartName;
    this.rating = rating;
  }
  addInstruction(instruction) {
    this.instructions.push(instruction);
  }
  toJson() {
    return {
      id: this.id,
      name: this.name,
      difficulty: this.difficulty,
      calories: this.calories,
      timeSeconds: this.timeSeconds,
      equipmentId: this.equipmentId,
      bodyPartId: this.bodyPartId,
      instructions: this.instructions,
      muscles: this.muscles,
    };
  }
  static fromJson(json) {
    return new Exercise(
      json.id,
      json.name,
      json.difficulty,
      json.calories,
      json.time_seconds,
      json.equipmentId,
      json.bodyPartId,
      json.instructions,
      json.body_part_name,
      json.equipment_name,
      json.muscles,
      json.rating
    );
  }
  static async get(id = null) {
    const resp = await super.get("exercises", id);
    if (resp.status === 200) {
      console.log(resp.data);
      return resp.data.map((exercise) => Exercise.fromJson(exercise));
    }
    return [];
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
