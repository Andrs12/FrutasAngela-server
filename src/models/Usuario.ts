const bcrypt = require('bcryptjs');
export class Usuarios {
    nombre: string;
    apellido1: string;
    apellido2: string;
    telefono: string;
    email: string;
    contrasena: string;

    constructor(nombre: string, apellido1:string,apellido2:string,telefono:string,email:string,contrasena:string) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.telefono = telefono;
        this.email = email;
        this.contrasena = contrasena;
    }

    encriptarContrasena = async() =>{
        const salt = await bcrypt.genSalt(10);
        return console.log(bcrypt.hash(this.contrasena,salt));
    }
}

