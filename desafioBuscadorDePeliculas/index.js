/* 
→ Controlador principal

Este módulo es el punto de entrada de la aplicación y se encarga de gestionar la interacción con el usuario.

- Responsabilidad: Recibe los argumentos desde la terminal (process.argv), los interpreta y delegá la lógica a funciones que están en pelis.js.


*/
const { readData, sortBy } = require('./pelis');





function main() {
    console.log("Main del programa");

    const args = process.argv.slice(2); // Extrae los argumentos de la línea de comandos, omitiendo los dos primeros (node y el script actual)
    const sortBy = args[0];

}

main(); 


/*  const pelis = readData().then(data => {
        console.log(data);
    }).catch(err => {
        console.error("Error al leer las peliculas: " + err);
    }); */