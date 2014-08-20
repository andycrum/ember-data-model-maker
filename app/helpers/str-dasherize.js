import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str) {
  debugger
  return Ember.String.dasherize(str);
});