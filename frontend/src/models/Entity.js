import ServiceManager from "../services/Service_Manager";
export default class Entity {
  constructor(modelEndPointUrl) {
    this.modelEndPointUrl = modelEndPointUrl;
  }
  static async get(modelEndPointUrl, id = null) {
    return await ServiceManager.get(modelEndPointUrl, id);
  }
  static async add(modelEndPointUrl, data) {
    return await ServiceManager.post(modelEndPointUrl, data);
  }
  async update(id, data) {
    ServiceManager.put(this.modelEndPointUrl, id, data);
  }
  async delete(id) {
    ServiceManager.delete(this.modelEndPointUrl, id);
  }

  /**
   * Create relation between 2 Entities
   * @param {Entity} entity
   * @returns
   */
  connect(entity, entityId) {
    return ServiceManager.post(
      this.modelEndPointUrl +
        `/${this.id}` +
        "/connect/" +
        entity.modelEndPointUrl +
        `/${entityId}`
    );
  }
}
