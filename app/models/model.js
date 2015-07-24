import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

var ModelModel = Model.extend({
  name:   attr('string'),
  fields: hasMany('field', {async: true})
});

ModelModel.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Post', fields: [1, 2, 3] },
    { id: 2, name: 'Author', fields: [4, 5, 6] }
  ]
});

export default ModelModel;