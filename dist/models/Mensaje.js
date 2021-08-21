"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Mensaje {
  constructor(email, fecha, texto) {
    this.email = email;
    this.fecha = fecha;
    this.texto = texto;
  }

}

exports.default = Mensaje;