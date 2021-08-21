"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Producto = _interopRequireDefault(require("../models/Producto.js"));

var _Archivo = _interopRequireDefault(require("../models/Archivo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Router = _express.default.Router();

//const { json } = require("body-parser");
//import json from "body-parser";
//Inicializaciones
var archivo = new _Archivo.default("./src/datasource/productos.txt"); //Rutas

Router.get("/listar", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var productos = yield archivo.getProductos();

      if (productos) {
        if (productos.length > 0) {
          res.status(200).json({
            productos: productos
          });
        } else {
          res.send({
            error: "No hay produtos cargados"
          });
        }
      } else {
        res.send({
          error: "No hay produtos cargados"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
Router.get("/vista", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var products = yield archivo.getProductos();
      res.render("products/allProducts", {
        products
      });
    } catch (err) {
      console.log(err);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
Router.get("/listar/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var id = req.params.id;

      var _prod = yield archivo.getProductosById(id);

      if (_prod) {
        res.status(200).json({
          producto: _prod
        });
      } else {
        res.status(400).json({
          error: "No existe el producto"
        });
      }
    } catch (error) {
      console.log("Error");
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
Router.get("/guardar", (req, res) => {
  res.render("products/newProduct");
});
Router.post("/guardar", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        title,
        price,
        thumbnail
      } = req.body;
      prod = new _Producto.default(title, price, thumbnail);
      var resultado = yield archivo.guardar(prod);

      if (resultado) {
        res.redirect("/api/productos/vista");
      } else {
        res.status(400).json({
          error: "No se pudo guardar el producto"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
Router.delete("/borrar/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var id = req.params.id;
      var producto = yield archivo.getProductosById(id);

      if (producto) {
        var result = yield archivo.borrar(producto.id);
        res.status(200).json(producto);
      } else {
        res.status(400).json("No se encontro el producto");
      }
    } catch (err) {
      throw err;
    }
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
Router.put("/actualizar/:id", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        price,
        title,
        thumbnail
      } = req.body;
      var producto = new _Producto.default(title, price, thumbnail);
      var id = req.params.id;

      var _prod2 = yield archivo.getProductosById(id);

      if (_prod2) {
        var act = yield archivo.actualizar(id, producto);
        res.status(200).json(act);
      } else {
        res.status(400).json({
          error: "Producto no encontrado"
        });
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
Router.get("/sala-products", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var productos = yield archivo.getProductos();

      if (productos) {
        if (productos.length > 0) {
          res.render("products/sala");
        } else {
          res.render("products/sala");
        }
      } else {
        throw new error("No se pudieron obtener los productos");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = Router;
exports.default = _default;