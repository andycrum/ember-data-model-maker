import Constants from 'ember-data-model-maker/utils/constants';
import Ember from 'ember';

export default Ember.Component.extend({
  typeOptions: Constants.TYPE_OPTIONS,
  field: null,
  changeObserver: function () {
    this.sendAction('update');
  }.observes('field.name', 'field.type', 'field.relatedTo'),

  actions: {
    removeField: function (field) {
      var parentModel = field.get('parentModel'),
          removedId = field.get('id'),
          fields = parentModel.get('fields');

      field.deleteRecord();

      // have to iterate through the fields to delete the correct field from the hasMany relationship
      fields.forEach(function (field) {
        if (!field || field.get('id') === removedId) {
          fields.removeObject(field);
        }
      });

      this.sendAction('update');
    }
  }
});
