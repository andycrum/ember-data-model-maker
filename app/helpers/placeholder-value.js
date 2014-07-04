import Constants from 'ember-data-model-maker/utils/constants';
import Ember from 'ember';

// Placeholder values for example JSON representation
export default Ember.Handlebars.makeBoundHelper(function(field, adapter) {
  if (!field.type) {
    return;
  }

  var typeUpper = field.type.toUpperCase(),
      placeholder = '',
      relatedTo = (!field.relatedTo || field.relatedTo === '')? '(relatedModel)' : field.relatedTo,
      orModelText = (adapter === 'DS.ActiveModelAdapter')? ' or '+relatedTo+' object' : '';

  // if relationship, use custom placeholder
  if(typeUpper === 'BELONGSTO') {
    placeholder = '<'+relatedTo+' id'+orModelText+'>';
  } else if(typeUpper === 'HASMANY') {
    placeholder = '[<'+relatedTo+' ids>]';
  } else {
    placeholder = Constants['PLACEHOLDER_'+typeUpper];
  }

  // if string, add quotes around value
  if(typeUpper === 'STRING') {
    placeholder = '"'+placeholder+'"';
  }

  return placeholder;
});
