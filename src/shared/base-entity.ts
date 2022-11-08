export class BaseEntity {
  constructor(entity?) {}
  
  static load(data) {
    return new this(data);
  }
}