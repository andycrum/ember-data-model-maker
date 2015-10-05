export default function() {

  // default models
  this.get('/models', function() {
    return {
      models: [
        { id: 1, name: 'Post', fields: [1, 2, 3] },
        { id: 2, name: 'Author', fields: [4, 5, 6] }
      ]
    };
  });

  // default fields
  this.get('/fields', function() {
    return {
      fields: [
        { id: 1, name: 'title', type: 'string', parentModel: 1 },
        { id: 2, name: 'body', type: 'string', parentModel: 1  },
        { id: 3, name: 'author', type: 'belongsTo', parentModel: 1 , relatedTo: 'author' },
        { id: 4, name: 'firstName', type: 'string', parentModel: 2  },
        { id: 5, name: 'lastName', type: 'string', parentModel: 2  },
        { id: 6, name: 'posts', type: 'hasMany', parentModel: 2, relatedTo: 'post' }
      ]
    };
  })
}
