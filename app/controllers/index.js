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
    const modelObjects = this.get('modelObjects');
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
      const model = this.store.createRecord('domain-model', {
        name: Ember.String.classify(modelName)
      });

      this.send('newField', model);
    },

    // Add a new field
    newField(model) {
      const currentFields = model.get('fields');

      currentFields.then((data) => {
        const newField = this.store.createRecord('field', {
          name: '',
          parentModel: model,
          type: 'string'
        });

        data.addObject(newField);
      });
    },

    // Remove a model
    removeModel(model) {
      const fields = model.get('fields');

      // iterate through fields and delete those records
      fields.forEach((field) => {
        if (field) {
          field.destroyRecord();
        }
      });

      model.destroyRecord();

      // trigger an update of the json,etc.
      // this does a mock ajax call or something, so it needs a timeout to work correctly
      Ember.run.later(() => {
        getModelInfo(this);
      }, 100);
    },

    // Triggered when fields/models are updated (to update json/model definitions)
    updateFields() {
      Ember.run.once(this, () => {
        getModelInfo(this);
      });
    }
  }
});
