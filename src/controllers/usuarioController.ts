import { json, Request, Response } from 'express';

import keys from '../keys';
import pool from '../database';
import { Usuarios } from '../models/Usuario';
import { token } from 'morgan';

class UsuarioController {

    public async list(req: Request, res: Response) {
        await pool.query('SELECT * FROM USUARIO', function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT * FROM USUARIO WHERE id = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Usuario encontrado");
        });

    }

    public async getOneByToken(req: Request, res: Response): Promise<void> {
        var jwt = require('jsonwebtoken');
        var decoded = jwt.verify(req.body.token, keys.jwt.key);
        res.json(decoded)

    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO USUARIO SET ?', [req.body]);
        console.log(req.body)
        res.json({ message: 'Creando un usuario' });
    }

    public async createCarro(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO carrito VALUES()');
        console.log(req.body)
        res.json({ message: 'Carrito Creado' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM USUARIO WHERE ID = ?', [id]);
        res.json({ text: 'Usuario borrado: ' + req.params.id });
    }

    public async udpate(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE USUARIO SET ? WHERE ID = ?', [req.body, id]);
        res.json({ message: 'Usuario actualizado' });
    }

    public async login(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const contrasena = req.body.contrasena;
        var usuario;
        const consulta = await pool.query("SELECT * FROM USUARIO WHERE email = \'" + email + "\' and contrasena = \'" + contrasena + "\'", function (err, result, fields) {
            if (err) throw err;
            if (result[0] != null) {
                usuario = {
                    id: result[0].ID,
                    nombre: result[0].NOMBRE,
                    apellido1: result[0].APELLIDO1,
                    apellido2: result[0].APELLIDO2,
                    telefono: result.TELEFONO,
                    email: result[0].EMAIL,
                    contrasena: result[0].CONTRASENA,
                    rol: result[0].ROL,
                    carro: result[0].ID_CARRITO 
                }
                try {
                    var jwt = require('jsonwebtoken');
                    const token = jwt.sign(usuario, keys.jwt.key);
                    res.json({ token: token });
                } catch (error) {
                    console.log("ERROR al encriptar");
                    res.json({ message: "No se ha podido encriptar" });
                }
            } else {
                res.json({ message: "usuario invalido" });
            }

        });


    }

    public async getDirecciones(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT * FROM DIRECCION WHERE ID_USUARIO = ?', id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Direcciones del usuario:",id,"encontradas");
        });
    }
    public async register(req: Request, res: Response): Promise<void> {  
        var usuario: any;
        try {
                usuario = ({
                    nombre: req.body.nombre,
                    apellido1: req.body.apellido1,
                    apellido2: req.body.apellido2,
                    telefono: req.body.telefono,
                    email: req.body.email,
                    contrasena: req.body.contrasena,
                    rol: req.body.rol
                });
                await pool.query("INSERT INTO `usuario` (`NOMBRE`, `APELLIDO1`, `APELLIDO2`, `TELEFONO`, `EMAIL`, `CONTRASENA`, `ROL`, `ID_CARRITO`) VALUES ('"+usuario.nombre+"', '"+usuario.apellido1+"', '"+usuario.apellido2+"', '"+usuario.telefono+"', '"+usuario.email+"', '"+usuario.contrasena+"', 2, (SELECT max(id) from usuario as us))");
                console.log("USUARIO INSERTADO----");
                try {
                    console.log(usuario) 
                    var jwt = require('jsonwebtoken');
                    const token = jwt.sign(usuario, keys.jwt.key);
                    res.json(({ token: token }));
                } catch (error) {
                    console.log("ERROR al encriptar");
                    res.json(({ message: "No se ha podido encriptar" }));
                }
        } catch (error) {
            console.log("ERROR al realizar la insercion");
        }

    }
    /* METODOS DE AYUDA */
    public encriptar(usuario: any) {
        try {
            console.log(usuario)
            var jwt = require('jsonwebtoken');
            const token = jwt.sign(usuario, keys.jwt.key);
            return ({ token: token });
        } catch (error) {
            console.log("ERROR al encriptar");
            return ({ message: "No se ha podido encriptar" });
        }
    }

    public async crearCarrito(req: Request, res: Response): Promise<void>{
       await pool.query('INSERT INTO CARRITO VALUES()');
       res.json({message: "Carrito creado"});
    }
    
    
}

export const usuarioController = new UsuarioController();