import { Request, Response } from 'express';

import pool from '../database';

class UsuarioController {

    public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM USUARIO', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    } 

    public async getOne (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT * FROM USUARIO WHERE id = ?',id, function(err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log("Usuario encontrado");
        }); 

    } 

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO USUARIO SET ?', [req.body]);
        console.log(req.body)
        res.json({message: 'Creando un usuario'});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM USUARIO WHERE ID = ?', [id]);
        res.json({text: 'Usuario borrado: '+ req.params.id});
    }
    
    public async udpate (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE USUARIO SET ? WHERE ID = ?',[req.body ,id]);
        res.json({message: 'Usuario actualizado'});
    }
}

export const usuarioController = new UsuarioController();