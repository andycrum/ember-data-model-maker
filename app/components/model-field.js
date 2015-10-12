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
      const parentModel = field.get('parentModel');
      const removedId   = field.get('id');
      const fields      = parentModel.get('fields');

      field.destroyRecord();

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
