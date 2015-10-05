import Ember from 'ember';

// Pluralizes
export default Ember.Helper.helper(function(params/*, hash*/) {
  const word = params[0];
  const type = params[1];
  if(type === 'hasMany') {
    return Ember.Inflector.inflector.pluralize(word);
  } else {
    return word;
  }
});

