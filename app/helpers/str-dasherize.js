import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str) {
  return Ember.String.dasherize(str);
});
