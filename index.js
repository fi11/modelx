var Obj = require('obx');
var Model;

exports.Model = Model = Obj.create(function Model(ctx) {
    var managers = {};
    var modelName = this.__constructor.name;

    [].concat(this.__parent.prototype.__managers || [], this.__managers || []).forEach(function(item) {
        Object.keys(item || {}).forEach(function(key) {
            managers[key] = new item[key](modelName, ctx);
        });
    });

    this.query = function(name) {
        return managers[name];
    };
});

exports.Manager = Obj.create(function Manager() {});
