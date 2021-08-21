import { Server } from "socket.io";
import Archivo from "../models/Archivo.js";
import Producto from "../models/Producto.js";
import Mensaje from "../models/Mensaje.js";
import {getMensajes,guardarMensaje} from "../helpers/mensajes.js";
let archivo = new Archivo("./src/datasource/productos.txt");
let archMessg = "./src/datasource/mensajes.txt"


export const initIo = async(server)=> {
    let productos = await archivo.getProductos();
    let mensajes = await getMensajes(archMessg);
    const io = new Server(server)
    io.on("connection", async socket => {
        

        socket.on("mensajes",async(data)=>{
            console.log("Me llego un Mensaje y lo voy a guardar")
            let mensaje = new Mensaje(data.email,data.fecha,data.texto);
            if(mensaje){
                await guardarMensaje(mensaje,archMessg);
            }
            mensajes = await getMensajes(archMessg);
            io.emit('mensajes', mensajes);
        })
        socket.on("productos", async (data) => {
            console.log("Me llego un mensaje y lo llevo al arreglo")
            let producto = new Producto(data.title, data.price, data.thumbnail);
            if (producto) {
                await archivo.guardar(producto)
            }
            productos = await archivo.getProductos()
            io.emit('productos', productos);
        });

        //Emito los mensajes 
        socket.on('askProducts', async(data) => {
            let productos = await archivo.getProductos();
            socket.emit('productos', productos);
        });

        socket.on('askMensajes',async (data) => {
            mensajes = await getMensajes(archMessg);
            socket.emit('mensajes', mensajes);
        });

    });
}
