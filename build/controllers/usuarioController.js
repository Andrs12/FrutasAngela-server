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
exports.usuarioController = void 0;
var keys_1 = __importDefault(require("../keys"));
var database_1 = __importDefault(require("../database"));
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
    }
    UsuarioController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('SELECT * FROM USUARIO', function (err, result, fields) {
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
    UsuarioController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        console.log(id);
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM USUARIO WHERE id = ?', id, function (err, result, fields) {
                                if (err)
                                    throw err;
                                res.json(result);
                                console.log("Usuario encontrado");
                            })];
                    case 1:
                        usuario = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.getOneByToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, decoded;
            return __generator(this, function (_a) {
                jwt = require('jsonwebtoken');
                decoded = jwt.verify(req.body.token, keys_1.default.jwt.key);
                res.json(decoded);
                return [2 /*return*/];
            });
        });
    };
    UsuarioController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('INSERT INTO USUARIO SET ?', [req.body])];
                    case 1:
                        _a.sent();
                        console.log(req.body);
                        res.json({ message: 'Creando un usuario' });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.createCarro = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('INSERT INTO carrito VALUES()')];
                    case 1:
                        _a.sent();
                        console.log(req.body);
                        res.json({ message: 'Carrito Creado' });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query('DELETE FROM USUARIO WHERE id = ?', [id])];
                    case 1:
                        _a.sent();
                        res.json({ text: 'Usuario borrado: ' + req.params.id });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.udpate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usuario = req.body;
                        console.log(usuario);
                        return [4 /*yield*/, database_1.default.query('UPDATE USUARIO SET ? WHERE id = ?', [usuario, usuario.id])];
                    case 1:
                        _a.sent();
                        console.log("Usuario actualizado");
                        res.json({ message: 'Usuario actualizado' });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, contrasena, usuario, consulta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        contrasena = req.body.contrasena;
                        console.log(email, contrasena);
                        return [4 /*yield*/, database_1.default.query("SELECT * FROM USUARIO WHERE email = '" + email + "' and contrasena = '" + contrasena + "'", function (err, result, fields) {
                                if (err)
                                    throw err;
                                if (result[0] != null) {
                                    usuario = {
                                        id: result[0].id,
                                        nombre: result[0].nombre,
                                        apellido1: result[0].apellido1,
                                        apellido2: result[0].apellido2,
                                        telefono: result[0].telefono,
                                        email: result[0].email,
                                        contrasena: result[0].contrasena,
                                        rol: result[0].rol,
                                        id_carrito: result[0].id_carrito
                                    };
                                    try {
                                        var jwt = require('jsonwebtoken');
                                        var token_1 = jwt.sign(usuario, keys_1.default.jwt.key);
                                        console.log("token firmado");
                                        console.log(token_1);
                                        res.json({ token: token_1 });
                                    }
                                    catch (error) {
                                        console.log(error);
                                        console.log("ERROR al encriptar");
                                        res.json({ message: "No se ha podido encriptar" });
                                    }
                                }
                                else {
                                    res.json({ message: "usuario invalido" });
                                }
                            })];
                    case 1:
                        consulta = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.getDirecciones = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM DIRECCION WHERE id_usuario = ?', id, function (err, result, fields) {
                                if (err)
                                    throw err;
                                res.json(result);
                                console.log("Direcciones del usuario:", id, "encontradas");
                            })];
                    case 1:
                        usuario = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.insertarDireccion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var direccion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        direccion = req.body;
                        console.log(direccion);
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `direccion`(`direccion`, `id_usuario`) VALUES ('" + direccion.direccion + "'," + direccion.idUsuario + ")")];
                    case 1:
                        _a.sent();
                        res.json({ message: "Direccion insertada" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.eliminarDireccion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1.default.query("DELETE FROM `direccion` WHERE id = " + id)];
                    case 1:
                        _a.sent();
                        res.json({ message: "Direccion eliminada" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario, jwt, token_2, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        usuario = req.body;
                        return [4 /*yield*/, database_1.default.query("INSERT INTO `usuario` (`nombre`, `apellido1`, `apellido2`, `telefono`, `email`, `contrasena`, `rol`, `id_carrito`) VALUES ('" + usuario.nombre + "', '" + usuario.apellido1 + "', '" + usuario.apellido2 + "', '" + usuario.telefono + "', '" + usuario.email + "', '" + usuario.contrasena + "', 2, (SELECT max(id) from usuario as us))")];
                    case 1:
                        _a.sent();
                        console.log("USUARIO INSERTADO----");
                        try {
                            console.log(usuario);
                            jwt = require('jsonwebtoken');
                            token_2 = jwt.sign(usuario, keys_1.default.jwt.key);
                            res.json(({ token: token_2 }));
                        }
                        catch (error) {
                            console.log("ERROR al encriptar");
                            res.json(({ message: "No se ha podido encriptar" }));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("ERROR al realizar la insercion");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /* METODOS DE AYUDA */
    UsuarioController.prototype.encriptar = function (usuario) {
        try {
            console.log(usuario);
            var jwt = require('jsonwebtoken');
            var token_3 = jwt.sign(usuario, keys_1.default.jwt.key);
            return ({ token: token_3 });
        }
        catch (error) {
            console.log("ERROR al encriptar");
            return ({ message: "No se ha podido encriptar" });
        }
    };
    UsuarioController.prototype.crearCarrito = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.query('INSERT INTO CARRITO VALUES()')];
                    case 1:
                        _a.sent();
                        res.json({ message: "Carrito creado" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsuarioController;
}());
exports.usuarioController = new UsuarioController();
