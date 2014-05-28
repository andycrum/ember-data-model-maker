// Lowercase + Pluralizes (e.g "Post" to "posts")
export default Ember.Handlebars.makeBoundHelper(function(word) {
  return Ember.String.pluralize(word).toLowerCase();
});