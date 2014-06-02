// Pluralizes and formats model name depending on adapter
export default Ember.Handlebars.makeBoundHelper(function(word, options) {
  var pluralized = Ember.String.pluralize(word),
      modelName = Ember.String.camelize(pluralized),
      adapter = options.data.view.get('parentView').controller.get('adapter');

  if(adapter === 'DS.ActiveModelAdapter') {
    modelName = Ember.String.decamelize(modelName);
  }

  return modelName;
});