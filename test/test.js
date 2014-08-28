var expect = require('chai').expect;
var Model = require('../index.js').Model;
var Manager = require('../index.js').Manager;

describe('Model', function() {
    it('Should have both managers', function(done) {
        var M1 = Model.create('M1', {
            __managers: { db: Manager.create('DbManager') }
        });

        var M2 = M1.create('M2', {
            foo: function() {
                expect(this.query('db')).to.be.instanceOf(Manager);
                expect(this.query('es')).to.be.instanceOf(Manager);
                done();
            },
            __managers: { es: Manager.create('EsManager') }
        });

        (new M2).foo();
    });
});

describe('Manager', function() {
    it('Should have right context and name in constructor', function(done) {
        var Context = { foo: 'bar' };
        var NewManager = Manager.create(function (name, ctx) {
            expect(name).to.eql('NewModel');
            expect(ctx).to.eql(Context);
            done();
        });

        var NewModel = Model.create('NewModel', { __managers: { db: NewManager } });
        new NewModel(Context);
    });
});
