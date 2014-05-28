var Field = DS.Model.extend({
  parentModel: DS.belongsTo('model'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  relatedTo: DS.attr('string', { defaultValue: null }),
  hasRelation: function() {
    var currentType = this.get('type');
    return (currentType === 'hasMany' || currentType === 'belongsTo');
  }.property('type')
});

Field.reopenClass({
  FIXTURES: [
    { id: 1, name: 'title', type: 'string', parentModel: 1 },
    { id: 2, name: 'body', type: 'string', parentModel: 1  },
    { id: 3, name: 'author', type: 'belongsTo', parentModel: 1 , relatedTo: 'author' },
    { id: 4, name: 'firstName', type: 'string', parentModel: 2  },
    { id: 5, name: 'lastName', type: 'string', parentModel: 2  },
    { id: 6, name: 'posts', type: 'hasMany', parentModel: 2, relatedTo: 'post' }
  ]
});

export default Field;