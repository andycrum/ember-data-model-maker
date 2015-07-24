import Ember from 'ember';

const { TextField } = Ember;

// Custom text field for 'new model' name
export default TextField.extend({
  didInsertElement() {
    this.$().focus();
  },

  keyDown(event) {
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

  save() {
    let controller = this.get('parentView').get('controller');
    let store = controller.get('store');

    let model = store.createRecord('model', {
      name: Ember.String.classify(this.$().val())
    });

    controller.set('creatingNewModel', false);
    controller.send('newField', model);
  }
});
