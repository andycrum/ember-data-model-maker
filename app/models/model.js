var Model = DS.Model.extend({
  name: DS.attr('string'),
  fields: DS.hasMany('field', {async: true})
});

Model.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Post', fields: [1, 2, 3] },
    { id: 2, name: 'Author', fields: [4, 5, 6] }
  ]
});

export default Model;