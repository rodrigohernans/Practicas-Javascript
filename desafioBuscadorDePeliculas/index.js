/* 
→ Controlador principal

Este módulo es el punto de entrada de la aplicación y se encarga de gestionar la interacción con el usuario.

- Responsabilidad: Recibe los argumentos desde la terminal (process.argv), los interpreta y delegá la lógica a funciones que están en pelis.js.

 * Si el argumento pasado es nada, debo mostrar todos los datos de pelis. 

*/

const { readData, sortBy, search, tag } = require('./pelis');


function main() {
    console.log("Main del programa");

    const args = process.argv.slice(2); // Extrae los argumentos de la línea de comandos, omitiendo los dos primeros (node y el script actual)
    const arg1 = args[0];
    const arg2 = args[1];


    readData().then(dataPelis => {
        if (args.length === 0) {
            console.table(dataPelis);
        }

        if (arg1 === "--sort") {
            if (!arg2) {
                console.error("Error: Debes especificar un criterio de ordenación (title, rating, year)");
                return;
            }
            if (arg2 === "title" || arg2 === "rating" || arg2 === "year") {
                sortBy(dataPelis, arg2); //si se cumple que el segundo argumento sea uno de los criterios de ordenación se ejecuta la funcion sortBy 
                return;
            }
        }
        if (arg1 === "--search") {
            search(dataPelis, arg2);
        }
        if(arg1 === "--tag") {
            tag(dataPelis, arg2);
        }
    })


}

main();
