export default function() {
  this.urlPrefix = '/';
  this.timing = 0;

  // domain models
  this.get('/domainModels', 'domain-models');
  this.del('/domainModels/:id', function(db, request) {
    return {
      field: db['domain-models'].remove(request.params.id)
    };
  });

  // fields
  this.get('/fields', 'fields');
  this.del('/fields', 'fields');
  this.get('/fields/:id', function(db, request) {
    return {
      field: db.fields.find(request.params.id)
    };
  });
  this.del('/fields/:id', function(db, request) {
    return {
      field: db.fields.remove(request.params.id)
    };
  });

}
