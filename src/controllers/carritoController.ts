import { Request, Response } from 'express';
import pool from '../database';
class CarritoController {


    public async getCarritoProductos(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const usuario = await pool.query('SELECT producto.ID, carrito_producto.ID as CARRITO_ID_PRODUCTO ,producto.NOMBRE, producto.PVP_UNIDAD, producto.IMAGEN ,carrito_producto.UNIDADES, (producto.PVP_UNIDAD*carrito_producto.UNIDADES) AS TOTAL FROM PRODUCTO, carrito_producto, carrito WHERE producto.ID = carrito_producto.ID_PRODUCTO AND carrito.ID = carrito_producto.CARRITO_ID AND CARRITO.ID =?', id, function (err, result, fields) {
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
        console.log(datos[datos.length - 1].ID_CARRITO)

        await pool.query("INSERT INTO `venta`(`ID_DIRECCION`) VALUES (" + datos[datos.length - 1].ID_Direccion + ")");
        console.log("VENTA INSERTADA");
        for (let i = 0; i < datos.length; i++) {
            if (datos[i].ID_Direccion == null) {
                await pool.query("INSERT INTO `venta_producto`(`ID_VENTA`, `ID_PRODUCTO`, `CANTIDAD`) VALUES ((SELECT MAX(ID) FROM venta) ," + datos[i].ID + "," + datos[i].UNIDADES + ")");
                console.log("PRODUCTO_VENTA INSERTADO");
            }
        }
        console.log("Productos Insertados");
        await pool.query("DELETE FROM `CARRITO_PRODUCTO` WHERE CARRITO_ID = " + datos[datos.length - 1].ID_Carrito);
        console.log("Produtos carro " + datos[datos.length - 1].ID_Carrito + "eliminados");
        console.log("Compla completada")




    }

    public async insertarVentaProducto(req: Request, res: Response): Promise<void> {

    }


    public async insertarProductoCarro(req: Request, res: Response): Promise<void> {
        const datos = req.body;
        await pool.query("INSERT INTO `carrito_producto`(`ID_PRODUCTO`, `UNIDADES`, `CARRITO_ID`) VALUES (" + datos.ID_PRODUCTO + "," + datos.UNIDADES + "," + datos.CARRITO_ID + ")");
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