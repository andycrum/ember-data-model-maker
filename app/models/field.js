import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, belongsTo, attr } = DS;

export default Model.extend({
  parentModel:      belongsTo('domainModel'),
  name:             attr('string'),
  jsonPropertyName: attr('string'),
  type:             attr('string'),
  relatedTo:        attr('string', { defaultValue: null }),
  hasRelation:      computed('type', function () {
    const currentType = this.get('type');
    return (currentType === 'hasMany' || currentType === 'belongsTo');
  })
});;