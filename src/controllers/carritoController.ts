import { Request, Response } from 'express';
import pool from '../database';
class CarritoController {


    public async getCarritoProductos(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT producto.id, carrito_producto.id as carrito_id_producto ,producto.nombre, producto.pvp_unidad, producto.imagen ,carrito_producto.unidades, (producto.pvp_unidad*carrito_producto.unidades) AS total FROM producto, carrito_producto, carrito WHERE producto.id = carrito_producto.id_producto AND carrito.id = carrito_producto.carrito_id AND carrito.id =?', id, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            console.log("Productos carrito encontrado");
        });
    }

    public async insertarVenta(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        console.log(datos)
        console.log("INSERTANDO CARRITO EN VENTA");
        console.log(datos[datos.length - 1].id_carrito)

        await pool.query("INSERT INTO `venta`(`ID_DIRECCION`) VALUES (" + datos[datos.length - 1].id_direccion + ")");
        console.log("VENTA INSERTADA");
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].ID_Direccion == null) {
                await pool.query("INSERT INTO `venta_producto`(`ID_VENTA`, `ID_PRODUCTO`, `CANTIDAD`) VALUES ((SELECT MAX(ID) FROM venta) ," + datos[i].id + "," + datos[i].unidades + ")");
                console.log("PRODUCTO_VENTA INSERTADO");
            }
        }
        console.log("Productos Insertados");
        await pool.query("DELETE FROM `CARRITO_PRODUCTO` WHERE CARRITO_ID = " + datos[datos.length - 1].id_carrito);
        console.log("Produtos carro " + datos[datos.length - 1].id_carrito + "eliminados");
        console.log("Compla completada")




    }

    public async insertarVentaProducto(req: Request, res: Response): Promise<void> {

    }


    public async insertarProductoCarro(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        await pool.query("INSERT INTO `carrito_producto`(`id_producto`, `unidades`, `carrito_id`) VALUES (" + datos.id_producto + "," + datos.unidades + "," + datos.carrito_id + ")");
        res.json({ message: "Producto insertado" });

    }

    public async eliminarProductoCarro(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        await pool.query("DELETE FROM `carrito_producto` WHERE ID = "+id);
        res.json({ message: "Producto eliminado del carrito" });
    }
}


export const carritoController = new CarritoController();