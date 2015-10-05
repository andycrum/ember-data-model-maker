import Ember from 'ember';

export default Ember.Helper.helper(function(params/*, hash*/) {
  return Ember.String.dasherize(params[0]);
});
