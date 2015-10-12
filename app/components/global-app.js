import Ember from 'ember';
import getModelInfo from 'ember-data-model-maker/utils/get-model-info';

export default Ember.Component.extend({
  willInsertElement() {
    getModelInfo(this.get('controller'));
  }
});
