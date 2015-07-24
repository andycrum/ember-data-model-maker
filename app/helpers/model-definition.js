import Ember from 'ember';

export function modelDefinition(params/*, hash*/) {
  return "model-definition/" + Ember.String.dasherize(params[0]);
}

export default Ember.HTMLBars.makeBoundHelper(modelDefinition);
