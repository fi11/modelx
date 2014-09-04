Simple base class for model with manager.

## Installation

```
$ npm install modelx
```

## Example

```js
var Model = require('modelx').Model;
var Manager = require('modelx').Manager;

function SomeManagerConstructor(name, ctx) {
    this.conn = ctx.connection;
    this.tableName = name.toLowerCase();
}

var SomeManager = Manager.create(SomeManagerConstructor, {
    insert: function(data) {
        this.conn.insert(this.tableName, data);
    }
});

var MyModel = Model.create('MyModel', {
    __managers: { db: SomeManager },
    create: function(data) {
        this.query('db').insert(data);
    }
});

var model = new MyModel(app);

model.create(data);

var ChildModel = MyModel.create('ChildModel', {
    __managers: { es: SearchManager },  // maybe Array;
    create: function(data) {
        this.query('db').insert(data);
        this.query('es').index(data);
    }
});

```
## Inherits

For inherits detail see [obj-c](https://www.npmjs.org/package/obx)

## Running tests

```
$ make test
```

## Authors

  - [Pavel Silin](https://github.com/fi11)

# License

  MIT
