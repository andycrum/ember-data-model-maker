import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateFields() {
      this.sendAction('updateFields');
    }
  }
});
