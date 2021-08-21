"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const handlebars_1 = __importDefault(require("handlebars"));
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const http_1 = __importDefault(require("http"));
const socketIo_js_1 = require("./services/socketIo.js");
const express_1 = __importDefault(require("express"));
const productosController_js_1 = __importDefault(require("./controllers/productosController.js"));
const app = express_1.default();
app.set('port', process.env.port || 8080);
app.set('views', path.resolve(__dirname, 'views'));
app.engine('.hbs', express_handlebars_1.default({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allow_prototype_access_1.allowInsecurePrototypeAccess(handlebars_1.default)
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const publicPath = path.resolve(__dirname, '../public');
console.log(publicPath);
app.use(express_1.default.static(publicPath));
app.use("/api/productos", productosController_js_1.default);
const Server = new http_1.default.Server(app);
//Inicio el servidor de socket
socketIo_js_1.initIo(Server);
//Listen
Server.listen(app.get('port'), () => {
    console.log("Servidor escuchando en " + app.get('port'));
});
