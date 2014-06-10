define("ember-data-model-maker/adapters/application",["ember-data","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.FixtureAdapter.extend({})}),define("ember-data-model-maker/app",["ember","ember/resolver","ember/load-initializers","exports"],function(e,t,a,s){"use strict";var n=e["default"],r=t["default"],l=a["default"];n.MODEL_FACTORY_INJECTIONS=!0;var o=n.Application.extend({modulePrefix:"ember-data-model-maker",Resolver:r});l(o,"ember-data-model-maker"),s["default"]=o}),define("ember-data-model-maker/controllers/field",["ember-data-model-maker/utils/constants","ember-data-model-maker/utils/get-model-info","ember","exports"],function(e,t,a,s){"use strict";var n=e["default"],r=t["default"],l=a["default"];s["default"]=l.ObjectController.extend({typeOptions:n.TYPE_OPTIONS,changeObserver:function(){l.run.once(this,function(){r(this.parentController)})}.observes("name","type","relatedTo"),actions:{removeField:function(){var e=this.get("model").get("parentModel"),t=this.get("model").get("id"),a=e.get("fields");this.get("model").deleteRecord(),a.forEach(function(e){e&&e.get("id")!==t||a.removeObject(e)}),r(this.parentController)}}})}),define("ember-data-model-maker/utils/constants",["exports"],function(e){"use strict";e["default"]={ADAPTER_OPTIONS:["DS.RESTAdapter","DS.ActiveModelAdapter"],TYPE_OPTIONS:["string","number","boolean","date","hasMany","belongsTo"],PLACEHOLDER_STRING:"foo",PLACEHOLDER_NUMBER:123,PLACEHOLDER_BOOLEAN:!0,PLACEHOLDER_DATE:new Date}}),define("ember-data-model-maker/utils/get-model-info",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=function(e){var t=e.store.all("model"),s=e.get("adapter"),n=[],r={},l={},o=[],u=[];e.set("modelObjects",[]),t.forEach(function(h,i){n[i]=[],h.get("fields").then(function(d){d.forEach(function(e,t){var l=e.get("name"),o=e.get("type");switch(l=""===l?"<field name>":l,s){case"DS.ActiveModelAdapter":"hasMany"===o?(l=a.Inflector.inflector.singularize(l),l=a.String.decamelize(l)+"_ids"):l="belongsTo"===o?a.String.decamelize(l)+"_id":a.String.decamelize(l);break;case"DS.RESTAdapter":l=a.String.camelize(l)}r={name:l,type:e.get("type"),relatedTo:e.get("relatedTo")},t===d.get("length")-1&&(r.lastField=!0),n[i].push(r),r={}}),l={name:h.get("name"),fields:n[i]},i===t.get("length")-1&&(l.lastModel=!0),o=e.get("modelObjects"),o.length&&o.forEach(function(e){e.name!==l.name&&u.push(e)}),u.push(JSON.parse(JSON.stringify(l))),u.length&&(e.set("modelObjects",u),u=[])})})}}),define("ember-data-model-maker/controllers/index",["ember-data-model-maker/utils/constants","ember-data-model-maker/utils/get-model-info","ember","exports"],function(e,t,a,s){"use strict";var n=e["default"],r=t["default"],l=a["default"];s["default"]=l.ArrayController.extend({adapter:n.ADAPTER_OPTIONS[0],adapterOptions:n.ADAPTER_OPTIONS,creatingNewField:!1,creatingNewModel:!1,jsonObjects:[],modelObjects:[],modelObserver:function(){var e=this.get("modelObjects");this.set("jsonObjects",e)}.observes("modelObjects"),changeObserver:function(){l.run.once(this,function(){r(this)})}.observes("adapter"),actions:{newModel:function(){this.set("creatingNewModel",!0)},newField:function(e){var t=e.get("fields"),a=this,s=a.store.createRecord("field",{name:"",parentModel:e});t.addObject(s)},removeModel:function(e){var t=e.get("fields"),a=this;t.forEach(function(e){e.deleteRecord()}),e.deleteRecord(),setTimeout(function(){r(a)},100)}}})}),define("ember-data-model-maker/helpers/camelize-word",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.makeBoundHelper(function(e){return a.String.camelize(e)})}),define("ember-data-model-maker/helpers/format-model-name",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.makeBoundHelper(function(e,t){var s=a.String.pluralize(e),n=a.String.camelize(s),r=t.data.view.get("parentView").controller.get("adapter");return"DS.ActiveModelAdapter"===r&&(n=a.String.decamelize(n)),n})}),define("ember-data-model-maker/helpers/placeholder-value",["ember-data-model-maker/utils/constants","ember","exports"],function(e,t,a){"use strict";var s=e["default"],n=t["default"];a["default"]=n.Handlebars.makeBoundHelper(function(e,t){var a=e.type.toUpperCase(),n="",r=e.relatedTo&&""!==e.relatedTo?e.relatedTo:"(relatedModel)",l="DS.ActiveModelAdapter"===t?" or "+r+" object":"";return n="BELONGSTO"===a?"<"+r+" id"+l+">":"HASMANY"===a?"[<"+r+" ids>]":s["PLACEHOLDER_"+a],"STRING"===a&&(n='"'+n+'"'),n})}),define("ember-data-model-maker/helpers/pluralize-word",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.makeBoundHelper(function(e,t){return"hasMany"===t?a.Inflector.inflector.pluralize(e):e})}),define("ember-data-model-maker/models/field",["ember-data","exports"],function(e,t){"use strict";var a=e["default"],s=a.Model.extend({parentModel:a.belongsTo("model"),name:a.attr("string"),type:a.attr("string"),relatedTo:a.attr("string",{defaultValue:null}),hasRelation:function(){var e=this.get("type");return"hasMany"===e||"belongsTo"===e}.property("type")});s.reopenClass({FIXTURES:[{id:1,name:"title",type:"string",parentModel:1},{id:2,name:"body",type:"string",parentModel:1},{id:3,name:"author",type:"belongsTo",parentModel:1,relatedTo:"author"},{id:4,name:"firstName",type:"string",parentModel:2},{id:5,name:"lastName",type:"string",parentModel:2},{id:6,name:"posts",type:"hasMany",parentModel:2,relatedTo:"post"}]}),t["default"]=s}),define("ember-data-model-maker/models/model",["ember-data","exports"],function(e,t){"use strict";var a=e["default"],s=a.Model.extend({name:a.attr("string"),fields:a.hasMany("field",{async:!0})});s.reopenClass({FIXTURES:[{id:1,name:"Post",fields:[1,2,3]},{id:2,name:"Author",fields:[4,5,6]}]}),t["default"]=s}),define("ember-data-model-maker/router",["ember","exports"],function(e,t){"use strict";var a=e["default"],s=a.Router.extend({location:EmberDataModelMakerENV.locationType});s.map(function(){}),t["default"]=s}),define("ember-data-model-maker/routes/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Route.extend({model:function(){return this.store.find("model")}})}),define("ember-data-model-maker/templates/application",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var l;l=s._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:r}),r.buffer.push(l||0===l?l:"")})}),define("ember-data-model-maker/templates/field",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function l(e,t){var a,n,r="";return t.buffer.push("\n"),t.buffer.push(f((a=s.input||e&&e.input,n={hash:{type:"text",value:"relatedTo",placeholder:"Model name"},hashTypes:{type:"STRING",value:"ID",placeholder:"STRING"},hashContexts:{type:e,value:e,placeholder:e},contexts:[],types:[],data:t},a?a.call(e,n):d.call(e,"input",n)))),t.buffer.push("\n"),r}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var o,u,h,i="",d=s.helperMissing,f=this.escapeExpression,p=this;return r.buffer.push(f((u=s.input||t&&t.input,h={hash:{type:"text",value:"name"},hashTypes:{type:"STRING",value:"ID"},hashContexts:{type:t,value:t},contexts:[],types:[],data:r},u?u.call(t,h):d.call(t,"input",h)))),r.buffer.push("\n"),r.buffer.push(f(s.view.call(t,"Ember.Select",{hash:{content:"typeOptions",value:"type"},hashTypes:{content:"ID",value:"ID"},hashContexts:{content:t,value:t},contexts:[t],types:["ID"],data:r}))),r.buffer.push("\n"),o=s["if"].call(t,"hasRelation",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,l,r),contexts:[t],types:["ID"],data:r}),(o||0===o)&&r.buffer.push(o),r.buffer.push("\n<a "),r.buffer.push(f(s.action.call(t,"removeField",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r}))),r.buffer.push(" class=\"remove-link\" href='#'>&times;</a>"),i})}),define("ember-data-model-maker/templates/index",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.Handlebars.template(function(e,t,s,n,r){function l(e,t){var a,n="";return t.buffer.push('\n    <li class="model-list-item"><h4>'),a=s._triageMustache.call(e,"item.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push(" <a "),t.buffer.push(S(s.action.call(e,"removeModel","item",{hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(" class=\"remove-link\" href='#'>&times;</a></h4>\n    <ul>\n    "),a=s.each.call(e,"item.fields",{hash:{itemController:"field"},hashTypes:{itemController:"STRING"},hashContexts:{itemController:e},inverse:O.noop,fn:O.program(2,o,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n    "),a=s["if"].call(e,"creatingNewField",{hash:{},hashTypes:{},hashContexts:{},inverse:O.program(6,h,t),fn:O.program(4,u,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n    </ul>\n    </li>\n  "),n}function o(e,t){var a,n,r="";return t.buffer.push("\n      <li>\n      "),t.buffer.push(S((a=s.partial||e&&e.partial,n={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t},a?a.call(e,"field",n):M.call(e,"partial","field",n)))),t.buffer.push("\n      </li>\n    "),r}function u(e,t){var a,n,r="";return t.buffer.push("\n      "),t.buffer.push(S((a=s.partial||e&&e.partial,n={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t},a?a.call(e,"field",n):M.call(e,"partial","field",n)))),t.buffer.push("\n    "),r}function h(e,t){var a="";return t.buffer.push("\n      <li><a "),t.buffer.push(S(s.action.call(e,"newField","item",{hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:t}))),t.buffer.push(' href="#">Add Field</a></li>\n    '),a}function i(e,t){var a="";return t.buffer.push("\n    <li>"),t.buffer.push(S(s.view.call(e,"new-model-field",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push("</li>\n  "),a}function d(e,t){var a="";return t.buffer.push("\n    <li><button "),t.buffer.push(S(s.action.call(e,"newModel",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(" type='button'>Add Model</button></li>\n  "),a}function f(e,t){var a,n="";return t.buffer.push("\n  "),a=s.each.call(e,"modelObjects",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(13,p,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  "),n}function p(e,t){var a,n="";return t.buffer.push("\n    <li>App."),a=s._triageMustache.call(e,"name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push(" = DS.Model.extend({<br>\n      <ul>\n      "),a=s.each.call(e,"fields",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(14,c,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n      </ul>\n    });</li>\n  "),n}function c(e,t){var a,n="";return t.buffer.push("\n      <li>\n        "),a=s["if"].call(e,"relatedTo",{hash:{},hashTypes:{},hashContexts:{},inverse:O.program(17,b,t),fn:O.program(15,m,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push(":\n        "),a=s["if"].call(e,"relatedTo",{hash:{},hashTypes:{},hashContexts:{},inverse:O.program(21,x,t),fn:O.program(19,y,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),a=s.unless.call(e,"lastField",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(23,v,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n      </li>\n      "),n}function m(e,t){var a,n;t.buffer.push(S((a=s["pluralize-word"]||e&&e["pluralize-word"],n={hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["ID","ID"],data:t},a?a.call(e,"relatedTo","type",n):M.call(e,"pluralize-word","relatedTo","type",n))))}function b(e,t){var a,n;t.buffer.push(S((a=s["camelize-word"]||e&&e["camelize-word"],n={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t},a?a.call(e,"name",n):M.call(e,"camelize-word","name",n))))}function y(e,t){var a,n,r,l="";return t.buffer.push("DS."),a=s._triageMustache.call(e,"type",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("('"),t.buffer.push(S((n=s["camelize-word"]||e&&e["camelize-word"],r={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t},n?n.call(e,"relatedTo",r):M.call(e,"camelize-word","relatedTo",r)))),t.buffer.push("')"),l}function x(e,t){var a,n="";return t.buffer.push("DS.attr('"),a=s._triageMustache.call(e,"type",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("')"),n}function v(e,t){t.buffer.push(",")}function g(e,t){var a,n="";return t.buffer.push("\n  <ul class='code-div'>\n   "),a=s.each.call(e,"jsonObjects",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(26,T,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n  </ul>\n  "),n}function T(e,t){var a,n,r,l="";return t.buffer.push('\n     <li>\n     "'),t.buffer.push(S((n=s["format-model-name"]||e&&e["format-model-name"],r={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t},n?n.call(e,"name",r):M.call(e,"format-model-name","name",r)))),t.buffer.push('": [{\n       <ul>\n       <li>"id": 1,</li>\n       '),a=s.each.call(e,"fields",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(27,I,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n       </ul>\n     }]"),a=s.unless.call(e,"lastModel",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(23,v,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("\n     </li>\n   "),l}function I(e,t){var a,n,r,l="";return t.buffer.push('\n         <li>"'),a=s._triageMustache.call(e,"name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push('": '),t.buffer.push(S((n=s["placeholder-value"]||e&&e["placeholder-value"],r={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t},n?n.call(e,"",r):M.call(e,"placeholder-value","",r)))),a=s.unless.call(e,"lastField",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(23,v,t),contexts:[e],types:["ID"],data:t}),(a||0===a)&&t.buffer.push(a),t.buffer.push("</li>\n       "),l}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,a.Handlebars.helpers),r=r||{};var D,C="",M=s.helperMissing,S=this.escapeExpression,O=this;return r.buffer.push("<section>\n  <h2>Models</h2>\n  <ul>\n  "),D=s.each.call(t,"item","in","model",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(1,l,r),contexts:[t,t,t],types:["ID","ID","ID"],data:r}),(D||0===D)&&r.buffer.push(D),r.buffer.push("\n  "),D=s["if"].call(t,"creatingNewModel",{hash:{},hashTypes:{},hashContexts:{},inverse:O.program(10,d,r),fn:O.program(8,i,r),contexts:[t],types:["ID"],data:r}),(D||0===D)&&r.buffer.push(D),r.buffer.push("\n  </ul>\n</section>\n\n<section>\n  <h2>Model Definitions</h2>\n  <ul class='code-div'>\n  "),D=s["if"].call(t,"modelObjects",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(12,f,r),contexts:[t],types:["ID"],data:r}),(D||0===D)&&r.buffer.push(D),r.buffer.push("\n  </ul>\n  <br>\n\n  <h2>Expected JSON</h2>\n  Adapter: "),r.buffer.push(S(s.view.call(t,"Ember.Select",{hash:{content:"adapterOptions",value:"adapter"},hashTypes:{content:"ID",value:"ID"},hashContexts:{content:t,value:t},contexts:[t],types:["ID"],data:r}))),r.buffer.push("<br>\n  "),D=s["if"].call(t,"jsonObjects",{hash:{},hashTypes:{},hashContexts:{},inverse:O.noop,fn:O.program(25,g,r),contexts:[t],types:["ID"],data:r}),(D||0===D)&&r.buffer.push(D),r.buffer.push("\n</section>\n"),C})}),define("ember-data-model-maker/views/index",["ember-data-model-maker/utils/get-model-info","ember","exports"],function(e,t,a){"use strict";var s=e["default"],n=t["default"];a["default"]=n.View.extend({willInsertElement:function(){s(this.get("controller"))}})}),define("ember-data-model-maker/views/new-model-field",["ember","exports"],function(e,t){"use strict";var a=e["default"];t["default"]=a.TextField.extend({didInsertElement:function(){this.$().focus()},keyDown:function(e){return 13===e.keyCode?(e.preventDefault(),this.save(),!1):27===e.keyCode?(e.preventDefault(),this.get("parentView").get("controller").set("creatingNewModel",!1),!1):void 0},save:function(){var e=this.get("parentView").get("controller"),t=e.get("store");t.createRecord("model",{name:a.String.classify(this.$().val())}),e.set("creatingNewModel",!1)}})});