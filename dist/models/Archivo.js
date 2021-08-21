"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promises = _interopRequireDefault(require("fs/promises"));

var _v = require("v8");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Clase archivo
class Archivo {
  //Constructor
  constructor(name) {
    var _this = this;

    _defineProperty(this, "getProductosById", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (id) {
        var array = [];

        try {
          var data = yield _this.getProductos();

          if (data) {
            for (var i in data) {
              if (data[i].id == id) {
                return data[i];
              }
            }
          }

          return null;
        } catch (error) {
          console.log("Error: " + error);
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    this.name = name;
  }

  //Metodo para leer la info del archivo productos.txt
  getProductos() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var array = [];

      try {
        var data = yield _promises.default.readFile(_this2.name, "utf-8");
        array = data.split("\n");
        var array2 = array.filter(data => data != "");

        if (array2.length > 0) {
          var productos = array2.map(data => JSON.parse(data));
          return productos;
        } else {
          return array2;
        }
      } catch (err) {
        console.log("Ocurrio un error " + err);
      }
    })();
  }

  //Metodo utilizado para guardar un objeto producto
  guardar(producto) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      var id = yield _this3.generarId();
      var productos = yield _this3.getProductos();

      if (productos) {
        producto.id = id;

        if (producto.title) {
          try {
            yield _promises.default.appendFile(_this3.name, "\n" + JSON.stringify(producto));
            return 1;
          } catch (err) {
            console.log("Ocurrio un error " + err);
          }
        }
      } else {
        yield _promises.default.writeFile(_this3.name, JSON.stringify(producto));
      }
    })();
  }

  //Metodo utilizado para generar el id
  generarId() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      var array = [];
      var data = yield _promises.default.readFile(_this4.name, "utf-8");
      array = data.split("\n");
      return array.length;
    })();
  }

  //Metodo utilizado para borrar el archivo
  borrar(id) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      var indice = 0;

      try {
        var productos = yield _this5.getProductos();

        for (var i in productos) {
          if (productos[i].id == id) {
            productos.splice(i, 1);
            yield _promises.default.unlink(_this5.name);
            yield _promises.default.writeFile(_this5.name, "");

            for (var _i in productos) {
              yield _this5.guardar(productos[_i]);
            }
          }
        }

        ;
      } catch (err) {
        throw err;
      }
    })();
  }

  actualizar(id, producto) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      var actualizada = 0;

      try {
        var productos = yield _this6.getProductos();

        if (productos) {
          for (var i in productos) {
            if (productos[i].id == id) {
              productos[i].title = producto.title;
              productos[i].price = producto.price;
              productos[i].thumbnail = producto.thumbnail;
              actualizada = 1;
              break;
            }
          }

          if (actualizada == 1) {
            yield _promises.default.unlink(_this6.name);
            yield _promises.default.writeFile(_this6.name, "");

            for (var _i2 in productos) {
              yield _this6.guardar(productos[_i2]);
            }

            return yield _this6.getProductosById(id);
          }
        }
      } catch (err) {
        throw err;
      }
    })();
  }

}

exports.default = Archivo;