import Constants from 'ember-data-model-maker/utils/constants';
import getModelInfo from 'ember-data-model-maker/utils/get-model-info';

export default Ember.ArrayController.extend({
  adapter: Constants.ADAPTER_OPTIONS[0],
  adapterOptions: Constants.ADAPTER_OPTIONS,
  creatingNewField: false,
  creatingNewModel: false,
  jsonObjects: [],
  modelObjects: [],

  // Observers
  modelObserver: function() {
    var modelObjects = this.get('modelObjects');
    this.set('jsonObjects', modelObjects);
  }.observes('modelObjects'),

  changeObserver: function() {
    Ember.run.once(this, function() {
      getModelInfo(this);
    });
  }.observes('adapter'),

  // Actions
  actions: {
    // Add a new model
    newModel: function() {
      this.set('creatingNewModel', true);
    },
    // Add a new field
    newField: function(model) {
      var currentFields = model.get('fields'),
          _this = this;

      var newField = _this.store.createRecord('field', {
        name: '',
        parentModel: model
      });

      currentFields.addObject(newField);
    }
  }
});