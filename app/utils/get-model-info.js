import Ember from 'ember';
import Constants from 'ember-data-model-maker/utils/constants';

// Converts models/fields to objects that can be represented as JSON
export default function getModelInfo(controller) {
  var models = controller.store.all('model'),
      adapter = controller.get('adapter'),
      fields = [],
      fieldObject = {},
      modelObject = {},
      modelObjects = [],
      newModelObjects = [];

  controller.set('modelObjects', []);

  models.forEach(function (model, index) {
    fields[index] = [];

    model.get('fields').then(function (currentFields) {
      currentFields.forEach(function (field, i) {
        var fieldName = field.get('name');
        var fieldType = field.get('type');

        fieldName = (fieldName === '')? '<field name>' : fieldName;

        switch (adapter) {
          case Constants.ADAPTER_ACTIVEMODEL:
            if (fieldType === 'hasMany') {
              fieldName = Ember.Inflector.inflector.singularize(fieldName);
              fieldName = Ember.String.decamelize(fieldName) + '_ids';
            } else if (fieldType === 'belongsTo') {
              fieldName = Ember.String.decamelize(fieldName) + '_id';
            } else {
              fieldName = Ember.String.decamelize(fieldName);
            }
            break;
          case Constants.ADAPTER_REST:
            fieldName = Ember.String.camelize(fieldName);
            break;
        }

        fieldObject = {
          name: field.get('name'),
          jsonPropertyName: fieldName,
          type: field.get('type'),
          relatedTo: field.get('relatedTo')
        };

        if (i === currentFields.get('length') - 1) {
          fieldObject.lastField = true;
        }

        fields[index].push(fieldObject);
        fieldObject = {};
      });

      modelObject = {
        name: model.get('name'),
        fields: fields[index]
      };

      if (index === models.get('length') - 1) {
        modelObject.lastModel = true;
      }

      modelObjects = controller.get('modelObjects');
      if (modelObjects.length) {
        modelObjects.forEach(function (mo) {
          if (mo.name !== modelObject.name) {
            newModelObjects.push(mo);
          }
        });
      }

      // Make a copy of the object and push to array (to fix references -- this is inside a loop)
      newModelObjects.push(JSON.parse(JSON.stringify(modelObject)));

      if (newModelObjects.length) {
        controller.set('modelObjects', newModelObjects);
        newModelObjects = [];
      }
    });
  });
}
