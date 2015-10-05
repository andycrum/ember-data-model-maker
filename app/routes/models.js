import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('model').then(function() {
      debugger;
    });
  }
});