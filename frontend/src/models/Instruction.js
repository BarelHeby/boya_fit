export default class Instruction {
  /**
   *
   * @param {int} exerciseId exercise id
   * @param {string} instruction instruction
   */
  constructor(exerciseId, instruction) {
    this.exerciseId = exerciseId;
    this.instruction = instruction;
  }
}
