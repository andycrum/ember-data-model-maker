// Define some constants
var constants = {
  ADAPTER_REST: 'DS.RESTAdapter',
  ADAPTER_ACTIVEMODEL: 'DS.ActiveModelAdapter',
  ADAPTER_JSONAPI: 'DS.JSONAPIAdapter',
  MODEL_FORMAT_ES6: 'ES6 Module',
  MODEL_FORMAT_GLOBAL: 'Global App',
  TYPE_OPTIONS: ['string', 'number', 'boolean', 'date', 'hasMany', 'belongsTo'],
  PLACEHOLDER_STRING: 'foo',
  PLACEHOLDER_NUMBER: 123,
  PLACEHOLDER_BOOLEAN: true,
  PLACEHOLDER_DATE: new Date()
};

constants.ADAPTER_OPTIONS = [constants.ADAPTER_JSONAPI, constants.ADAPTER_REST, constants.ADAPTER_ACTIVEMODEL];
constants.MODEL_FORMAT_OPTIONS = [constants.MODEL_FORMAT_ES6, constants.MODEL_FORMAT_GLOBAL];

export default constants;
