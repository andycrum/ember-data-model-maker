import Ember from 'ember';

// Camelizes
export default Ember.Helper.helper(function(params/*, hash*/) {
  return Ember.String.camelize(params[0]);
});