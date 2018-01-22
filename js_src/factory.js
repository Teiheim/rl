export class Factory {
  constructor(productClass, DatastoreNumbSpace) {
    this.knownTemplates = {};
    this.productClass = productClass;
    this.knownTemplates;
  }
  learn(template) {
    this.knownTemplates[template.templateName ? template.templateName : template.Name] = template;
  }
  create(templateName) {
    let produc= new this.productClassk
  }
}
