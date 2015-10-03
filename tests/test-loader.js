/* globals requirejs,require */
import Ember from 'ember';

// TODO: load based on params
Object.keys(requirejs.entries).forEach(function(entry) {
  if ((/\-test/).test(entry)) {
    require(entry, null, null, true);
  }
});
