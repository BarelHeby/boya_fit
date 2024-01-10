import ServiceManager from "../services/Service_Manager";
export default class Entity {
  constructor(modelEndPointUrl) {
    this.modelEndPointUrl = modelEndPointUrl;
  }
  get(id = null) {
    ServiceManager.get(this.modelEndPointUrl, id);
  }
  add(data) {
    ServiceManager.post(this.modelEndPointUrl, data);
  }
  update(id, data) {
    ServiceManager.put(this.modelEndPointUrl, id, data);
  }
  delete(id) {
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
