import getModelInfo from 'ember-data-model-maker/utils/get-model-info';
import Ember from 'ember';

export default Ember.View.extend({
  // populate modelObjects (for json) on view creation
  willInsertElement() {
    getModelInfo(this.get('controller'));
  }
});