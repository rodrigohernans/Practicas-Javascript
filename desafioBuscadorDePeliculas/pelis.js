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
                sortedPelis = [...pelis].sort((a, b) => a.title.localeCompare(b.title))
                console.table(sortedPelis);
                break;
            case "rating":
                sortedPelis = [...pelis].sort((a, b) => a.rating - b.rating)
                console.table(sortedPelis);

                break;
            case "year":
                sortedPelis = [...pelis].sort((a, b) => a.year - b.year)
                console.table(sortedPelis);
                break;
            default:
                break;
        }
        return sortedPelis;

    } catch (error) {
        console.error("Error al ordenar las peliculas: " + error);
    }
}


async function search(dataPelis, text) {
    const pelis = await dataPelis;

    try {
        if (text === undefined || text === "") {
            console.error("Error: Debes especificar un texto con el titulo de la pelicula a buscar");
            return;
        }
        const peliEncontrada = pelis.filter((peli) => peli.title.toLowerCase().includes(text.toLowerCase()));
        if (peliEncontrada.length === 0) {
            console.log(`No se encontro ninguna pelicula con el texto "${text}", busque otra opción`);
        } else {
            console.table(peliEncontrada);
        }


    } catch (error) {
        console.error("Error al buscar la pelicula: " + error);
    }
}

async function tag(dataPelis, tagTexto) {
    const pelis = await dataPelis;
    try {
        if (tagTexto === undefined || tagTexto === "") {
            console.error("Error: Debes especificar un tag para buscar peliculas, ejemplo: aventura");
            return;
        }
        const pelisFiltradasTag = pelis.filter(peli =>
            peli.tags.some(tag =>
                tag.toLowerCase() // normaliza mayusculas
                    .normalize("NFD") // normaliza caracteres especiales
                    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
                    .includes( 
                        tagTexto.toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                    )
            )
        );
        console.table(pelisFiltradasTag);

    } catch (error) {
        console.error("Error al buscar peliculas por tag: " + error);
    }
}


module.exports = {
    sortBy,
    readData,
    search,
    tag
};