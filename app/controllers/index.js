import Constants from 'ember-data-model-maker/utils/constants';
import getModelInfo from 'ember-data-model-maker/utils/get-model-info';
import Ember from 'ember';

const { Controller, computed, observer } = Ember;

export default Controller.extend({
  adapter: Constants.ADAPTER_OPTIONS[0],
  adapterOptions: Constants.ADAPTER_OPTIONS,
  modelFormat: Constants.MODEL_FORMAT_OPTIONS[0],
  modelFormatOptions: Constants.MODEL_FORMAT_OPTIONS,
  creatingNewModel: false,
  jsonObjects: [],
  modelObjects: [],
  isGlobalFormat: computed.equal('modelFormat', Constants.MODEL_FORMAT_GLOBAL),

  // Observers
  modelObserver: observer('modelObjects', function () {
    var modelObjects = this.get('modelObjects');
    this.set('jsonObjects', modelObjects);
  }),

  isJSONAPI: computed('adapter', function() {
    return this.get('adapter') === Constants.ADAPTER_JSONAPI;
  }),

  changeObserver: observer('adapter', function () {
    this.send('updateFields');
  }),

  // Actions
  actions: {

    // Add a new model
    newModel(modelName) {
      let model = this.store.createRecord('model', {
        name: Ember.String.classify(modelName)
      });
      this.send('newField', model);
    },

    // Add a new field
    newField(model) {
      var currentFields = model.get('fields'),
        _this = this;

      currentFields.then(function (data) {
        var newField = _this.store.createRecord('field', {
          name: '',
          parentModel: model
        });

        data.addObject(newField);
      });
    },

    // Remove a model
    removeModel(model) {
      var fields = model.get('fields'),
          _this = this;

      // iterate through fields and delete those records
      fields.forEach(function (field) {
        field.deleteRecord();
      });

      model.deleteRecord();

      // trigger an update of the json,etc.
      // this does a mock ajax call or something, so it needs a timeout to work correctly
      Ember.run.later(function () {
        getModelInfo(_this);
      }, 100);
    },

    // Triggered when fields/models are updated (to update json/model definitions)
    updateFields() {
      Ember.run.once(this, function () {
        getModelInfo(this);
      });
    }
  }
});
