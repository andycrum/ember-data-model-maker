import Ember from 'ember';

export default Ember.Helper.helper(function modelDefinition(params/*, hash*/) {
  return "model-definition/" + Ember.String.dasherize(params[0]);
});
