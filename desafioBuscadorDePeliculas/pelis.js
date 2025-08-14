/* 
Esta modularización permite que el codigo sea mas organizado, leyendo el archivo de pelis.json, parsearlo, y exponer funciones que permitan buscar peliculas filtradas, ordenadas, etc

Las respondabilidades que el desafio pide es: 
- Leer el archivo pelis.json
- Parsear el contenido del archivo
- Exponer una función que muestra todas las peliculas
- Exponer una función que busque peliculas por nombre , pero ordenado --sort title, sort rating , y sort year

- Exponer una función que busque peliculas por genero, osea que tengan --search + el texto del argumento, ej: {nombre de la pelicula}
--search un Texto que contenga el titulo de la pelicula ej: "magic"

--clasificar por TAG, ej --tag "comedia" o --tag "terror"


IMPORTANTE el archivo pelis.json debe estar en la misma carpeta que este archivo index.js, y debe leer con __dirname.. 
fs.readFileSync(__dirname +"/pelis.json")

*/

const fs = require('fs');

async function readData() {
    try {
        const data = await fs.promises.readFile(__dirname + "/pelis.json", 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error("Error al leer los datos: ," + err);
        return [];
    }
}

const data = readData().then(data => {
    return data;
}).catch(err => {
    console.error("Error al leer las peliculas: " + err);
});



/* 
Esta funcion se va a encargar de ordenar las peliculas, por titulo, rating, years... 
*/

async function sortBy(dataPromises, keyWord) {


    const pelis = await dataPromises;

    try {
        if (!Array.isArray(pelis)) {
            throw new Error("Los datos no son un array");
        }
        let sortedPelis;
        switch (keyWord) {
            case "title":
                sortedPelis =  [...pelis].sort((a, b) => a.title.localeCompare(b.title))
                    .map(peli => peli.title);
                console.log("Peliculas ordenadas por titulo: " + sortedPelis.join(", "));
                break;
            case "rating":
                sortedPelis = [...pelis].sort((a, b) => b.rating - a.rating)
                    .map(peli => `(${peli.rating})`);
                console.log("Peliculas ordenadas por rating: " + sortedPelis.join(", "));
                break;
            case "year":
                sortedPelis = [...pelis].sort((a, b) => b.year - a.year)
                    .map(peli => `(${peli.year})`);
                console.log("Peliculas ordenadas por year: " + sortedPelis.join(", "));
                break;
            default:
                break;
        }
        return sortedPelis;

    } catch (error) {
        console.error("Error al ordenar las peliculas: " + error);
    }
}

/* sortBy(data, "title"); */

module.exports = {
    sortBy,
    readData
}; 