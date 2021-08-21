"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initIo = void 0;

var _socket = require("socket.io");

var _Archivo = _interopRequireDefault(require("../models/Archivo.js"));

var _Producto = _interopRequireDefault(require("../models/Producto.js"));

var _Mensaje = _interopRequireDefault(require("../models/Mensaje.js"));

var _mensajes = require("../helpers/mensajes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var archivo = new _Archivo.default("./src/datasource/productos.txt");
var archMessg = "./src/datasource/mensajes.txt";

var initIo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (server) {
    var productos = yield archivo.getProductos();
    var mensajes = yield (0, _mensajes.getMensajes)(archMessg);
    var io = new _socket.Server(server);
    io.on("connection", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (socket) {
        socket.on("mensajes", /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(function* (data) {
            console.log("Me llego un Mensaje y lo voy a guardar");
            var mensaje = new _Mensaje.default(data.email, data.fecha, data.texto);

            if (mensaje) {
              yield (0, _mensajes.guardarMensaje)(mensaje, archMessg);
            }

            mensajes = yield (0, _mensajes.getMensajes)(archMessg);
            io.emit('mensajes', mensajes);
          });

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        }());
        socket.on("productos", /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(function* (data) {
            console.log("Me llego un mensaje y lo llevo al arreglo");
            var producto = new _Producto.default(data.title, data.price, data.thumbnail);

            if (producto) {
              yield archivo.guardar(producto);
            }

            productos = yield archivo.getProductos();
            io.emit('productos', productos);
          });

          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }()); //Emito los mensajes 

        socket.on('askProducts', /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(function* (data) {
            var productos = yield archivo.getProductos();
            socket.emit('productos', productos);
          });

          return function (_x5) {
            return _ref5.apply(this, arguments);
          };
        }());
        socket.on('askMensajes', /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator(function* (data) {
            mensajes = yield (0, _mensajes.getMensajes)(archMessg);
            socket.emit('mensajes', mensajes);
          });

          return function (_x6) {
            return _ref6.apply(this, arguments);
          };
        }());
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  return function initIo(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.initIo = initIo;