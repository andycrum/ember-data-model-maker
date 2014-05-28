import Constants from 'ember-data-model-maker/utils/constants';
import getModelInfo from 'ember-data-model-maker/utils/get-model-info';

// Controller used as itemController for each model field
export default Ember.ObjectController.extend({
  typeOptions: Constants.TYPE_OPTIONS,
  changeObserver: function() {
    Ember.run.once(this, function() {
      getModelInfo(this.parentController);
    });
  }.observes('name', 'type', 'relatedTo'),
  actions: {
    removeField: function() {
      var parentModel = this.get('model').get('parentModel'),
          removedId = this.get('model').get('id'),
          fields = parentModel.get('fields');

      this.get('model').deleteRecord();

      // have to iterate through the fields to delete the correct field from the hasMany relationship
      fields.forEach(function(field) {
        if(!field || field.get('id') === removedId) {
          fields.removeObject(field);
        }
      });

      getModelInfo(this.parentController);
    }
  }
});