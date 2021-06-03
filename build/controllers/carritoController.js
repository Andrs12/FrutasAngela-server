"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoController = void 0;
var database_1 = __importDefault(require("../database"));
var CarritoController = /** @class */ (function () {
    function CarritoController() {
    }
    CarritoController.prototype.getCarritoProductos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log(id);
                        return [4 /*yield*/, database_1.default.query('SELECT producto.id, carrito_producto.id as carrito_id_producto ,producto.nombre, producto.pvp_unidad, producto.imagen ,carrito_producto.unidades, (producto.pvp_unidad*carrito_producto.unidades) AS total FROM producto, carrito_producto, carrito WHERE producto.id = carrito_producto.id_producto AND carrito.id = carrito_producto.carrito_id AND carrito.id =?', id, function (err, result, fields) {
                                if (err)
                                    throw err;
                                console.log(result);
                                res.json(result);
                                console.log("Productos carrito encontrado");
                            })];
                    case 1:
                        usuario = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CarritoController.prototype.insertarVenta = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var datos, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datos = req.body;
                        console.log(datos);
                        console.log("INSERTANDO CARRITO EN VENTA");
                        console.log(datos[datos.length - 1].id_carrito);
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `venta`(`ID_DIRECCION`) VALUES (" + datos[datos.length - 1].id_direccion + ")")];
                    case 1:
                        _a.sent();
                        console.log("VENTA INSERTADA");
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < datos.length)) return [3 /*break*/, 5];
                        if (!(datos[i].ID_Direccion == null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `venta_producto`(`ID_VENTA`, `ID_PRODUCTO`, `CANTIDAD`) VALUES ((SELECT MAX(ID) FROM venta) ," + datos[i].id + "," + datos[i].unidades + ")")];
                    case 3:
                        _a.sent();
                        console.log("PRODUCTO_VENTA INSERTADO");
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log("Productos Insertados");
                        return [4 /*yield*/, database_1.default.query("DELETE FROM `CARRITO_PRODUCTO` WHERE CARRITO_ID = " + datos[datos.length - 1].id_carrito)];
                    case 6:
                        _a.sent();
                        console.log("Produtos carro " + datos[datos.length - 1].id_carrito + "eliminados");
                        console.log("Compla completada");
                        return [2 /*return*/];
                }
            });
        });
    };
    CarritoController.prototype.insertarVentaProducto = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CarritoController.prototype.insertarProductoCarro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var datos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datos = req.body;
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `carrito_producto`(`id_producto`, `unidades`, `carrito_id`) VALUES (" + datos.id_producto + "," + datos.unidades + "," + datos.carrito_id + ")")];
                    case 1:
                        _a.sent();
                        res.json({ message: "Producto insertado" });
                        return [2 /*return*/];
                }
            });
        });
    };
    CarritoController.prototype.eliminarProductoCarro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log(id);
                        return [4 /*yield*/, database_1.default.query("DELETE FROM `carrito_producto` WHERE ID = " + id)];
                    case 1:
                        _a.sent();
                        res.json({ message: "Producto eliminado del carrito" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CarritoController;
}());
exports.carritoController = new CarritoController();
