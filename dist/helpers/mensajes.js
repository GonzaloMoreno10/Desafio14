"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMensajes = getMensajes;
exports.guardarMensaje = guardarMensaje;

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getMensajes(_x) {
  return _getMensajes.apply(this, arguments);
}

function _getMensajes() {
  _getMensajes = _asyncToGenerator(function* (archivo) {
    var array = [];

    try {
      var data = yield _promises.default.readFile(archivo, "utf-8");
      array = data.split("\n");
      var array2 = array.filter(data => data != "");

      if (array2.length > 0) {
        var mensajes = array2.map(data => JSON.parse(data));
        return mensajes;
      } else {
        return array2;
      }
    } catch (err) {
      console.log("Ocurrio un error " + err);
    }
  });
  return _getMensajes.apply(this, arguments);
}

;

function guardarMensaje(_x2, _x3) {
  return _guardarMensaje.apply(this, arguments);
}

function _guardarMensaje() {
  _guardarMensaje = _asyncToGenerator(function* (mensaje, archivo) {
    if (mensaje.email) {
      try {
        yield _promises.default.appendFile(archivo, "\n" + JSON.stringify(mensaje));
        return 1;
      } catch (err) {
        console.log("Ocurrio un error " + err);
      }
    }
  });
  return _guardarMensaje.apply(this, arguments);
}

;