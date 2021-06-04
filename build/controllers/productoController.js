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
exports.productoController = void 0;
var database_1 = __importDefault(require("../database"));
var ProductoController = /** @class */ (function () {
    function ProductoController() {
    }
    ProductoController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('SELECT * FROM PRODUCTO', function (err, result, fields) {
                            if (err)
                                throw err;
                            res.json(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM PRODUCTO WHERE id = ?', id, function (err, result, fields) {
                                if (err)
                                    throw err;
                                res.json(result);
                                console.log("Producto encontrado");
                            })];
                    case 1:
                        producto = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.getOneLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nombre, producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nombre = req.params.nombre;
                        return [4 /*yield*/, database_1.default.query("SELECT * FROM `producto` WHERE nombre like '%" + nombre + "%'", function (err, result, fields) {
                                if (err)
                                    throw err;
                                res.json(result);
                                console.log("Producto encontrado");
                            })];
                    case 1:
                        producto = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.getProductoTipos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('SELECT * FROM tipo_producto', function (err, result, fields) {
                            if (err)
                                throw err;
                            res.json(result);
                            console.log("Tipos de producto encontrados");
                        })];
                    case 1:
                        producto = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        producto = req.body;
                        console.log(producto);
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `producto`(`nombre`, `tipo_producto`, `descripcion`, `pvp_unidad`, `stock`, `imagen`) VALUES ('" + producto.nombre + "'," + producto.tipo_producto + ",'" + producto.descripcion + "'," + producto.pvp_unidad + "," + producto.stock + ",'" + producto.imagen + "')")];
                    case 1:
                        _a.sent();
                        res.json({ message: 'creando un producto' });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query('DELETE FROM PRODUCTO WHERE id = ?', [id])];
                    case 1:
                        _a.sent();
                        res.json({ message: 'Producto borrado: ' + req.params.id });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductoController.prototype.udpate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        producto = req.body;
                        return [4 /*yield*/, database_1.default.query('UPDATE PRODUCTO SET ? WHERE id = ?', [producto, producto.id])];
                    case 1:
                        _a.sent();
                        res.json({ message: 'Producto actualizado correctamente' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductoController;
}());
exports.productoController = new ProductoController();
