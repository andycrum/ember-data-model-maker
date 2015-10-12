export default function() {
  this.urlPrefix = '/';

  this.get('/domainModels', 'domain-models');
  this.get('/fields', 'fields');
  this.get('/fields/:id', function(db, request) {
    return {
      field: db.fields.find(request.params.id)
    };
  });

}
