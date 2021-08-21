import fs from "fs/promises";

export async function getMensajes(archivo) {
    let array = [];
    try {
        let data = await fs.readFile(archivo, "utf-8")
        array = data.split("\n");
        let array2 = array.filter(data => data != "");
        if (array2.length > 0) {
            let mensajes = array2.map(data => JSON.parse(data))
            return mensajes;
        }
        else {
            return array2
        }
    }
    catch (err) {
        console.log("Ocurrio un error " + err)
    }
};

export async function guardarMensaje(mensaje, archivo) {
    if (mensaje.email) {
        try {
            await fs.appendFile(archivo, "\n" + JSON.stringify(mensaje));
            return 1
        }
        catch (err) {
            console.log("Ocurrio un error " + err)
        }
    }
};