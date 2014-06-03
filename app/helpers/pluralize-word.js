// Pluralizes
export default Ember.Handlebars.makeBoundHelper(function(word, type) {
  if(type === 'hasMany') {
    return Ember.Inflector.inflector.pluralize(word);
  } else {
    return word;
  }
});

