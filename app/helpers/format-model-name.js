import Ember from 'ember';
import Constants from 'ember-data-model-maker/utils/constants';

// Pluralizes and formats model name depending on adapter
export default Ember.Handlebars.makeBoundHelper(function (word, adapterName) {
  var pluralized = Ember.String.pluralize(word),
      modelName = Ember.String.camelize(pluralized);

  if (adapterName === Constants.ADAPTER_ACTIVEMODEL) {
    modelName = Ember.String.decamelize(modelName);
  }

  return modelName;
});