export class BaseEntity {
  constructor(entity: BaseEntity) {}
  
  static load(data) {
    return new this(data);
  }
}