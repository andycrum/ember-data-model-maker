import Ember from 'ember';

// Camelizes
export default Ember.Handlebars.makeBoundHelper(function(word) {
  return Ember.String.camelize(word);
});