import getModelInfo from 'ember-data-model-maker/utils/get-model-info';

export default Ember.View.extend({
  // populate modelObjects (for json) on view creation
  willInsertElement: function() {
    getModelInfo(this.get('controller'));
  }
});