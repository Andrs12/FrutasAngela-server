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

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO USUARIO SET ?', [req.body]);
        console.log(req.body)
        res.json({ message: 'Creando un usuario' });
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
            if(result[0]!=null){
                usuario ={
                    nombre: result[0].NOMBRE, 
                    apellido1: result[0].APELLIDO1,
                    apellido2: result[0].APELLIDO2,
                    telefono: result.TELEFONO,
                    email: result[0].EMAIL,
                    contrasena: result[0].CONTRASENA
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
                res.json({message: "usuario invalido"});
            }
            
        });
        
       
    }

    public async register(req: Request, res: Response): Promise<void> {
        var usuario;

        try {
            usuario = ({
                nombre: req.body.nombre,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                telefono: req.body.telefono,
                email: req.body.email,
                contrasena: req.body.contrasena
            });
            console.log(usuario);
            await pool.query('INSERT INTO USUARIO SET ?', usuario);
            console.log("INSERTADO");

        } catch (error) {
            console.log("ERROR al realizar la insercion");
        }
        try {
            var jwt = require('jsonwebtoken');
            const token = jwt.sign(usuario, keys.jwt.key);
            res.json({ token: token });
        } catch (error) {
            console.log("ERROR al encriptar");
            res.json({ message: "No se ha podido encriptar" });
        }
    }



}

export const usuarioController = new UsuarioController();