import ServiceManager from "../services/Service_Manager";
export default class Entity {
  constructor(modelEndPointUrl) {
    this.modelEndPointUrl = modelEndPointUrl;
  }
  async get(id = null) {
    ServiceManager.get(this.modelEndPointUrl, id);
  }
  async add(data) {
    return await ServiceManager.post(this.modelEndPointUrl, data);
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
