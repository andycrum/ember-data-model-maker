import Ember from 'ember';
import Constants from 'ember-data-model-maker/utils/constants';

// Pluralizes and formats model name depending on adapter
export default Ember.Helper.helper(function (params/*, hash*/) {
  const word = params[0];
  const adapterName = params[1];
  if (adapterName === Constants.ADAPTER_JSONAPI) {
    return Ember.String.pluralize(Ember.String.decamelize(Ember.String.dasherize(word)));
  }

  var pluralized = Ember.String.pluralize(word),
      modelName = Ember.String.camelize(pluralized);

  if (adapterName === Constants.ADAPTER_ACTIVEMODEL) {
    modelName = Ember.String.decamelize(modelName);
  }

  return modelName;
});