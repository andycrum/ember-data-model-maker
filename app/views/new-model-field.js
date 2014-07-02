import Ember from 'ember';

// Custom text field for 'new model' name
export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  keyDown: function(event) {
    // Enter/Return key -> save
    if (event.keyCode === 13) {
      event.preventDefault();
      this.save();
      return false;
    }
    // Escape key -> cancel
    else if (event.keyCode === 27) {
      event.preventDefault();
      this.get('parentView').get('controller').set('creatingNewModel', false);
      return false;
    }
  },
  save: function() {
    var controller = this.get('parentView').get('controller'),
        store = controller.get('store');

    var model = store.createRecord('model', {
      name: Ember.String.classify(this.$().val())
    });

    controller.set('creatingNewModel', false);
    controller.send('newField', model);
  }
});
