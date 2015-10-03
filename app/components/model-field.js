import Constants from 'ember-data-model-maker/utils/constants';
import Ember from 'ember';

const { Component, observer } = Ember;

export default Component.extend({
  typeOptions: Constants.TYPE_OPTIONS,
  field: null,
  changeObserver: observer('field.name', 'field.type', 'field.relatedTo', function () {
    this.sendAction('update');
  }),

  actions: {
    removeField(field) {
      let parentModel = field.get('parentModel');
      let removedId = field.get('id');
      let fields = parentModel.get('fields');

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
