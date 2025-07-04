
const todasLasCardsDisponibles = [
    {
        id: "curso-javascript",
        titulo: "Curso Javascript",
        descripcion: 'Fundamentos del desarrollo web',
    },
    {
        id: "curso-python",
        titulo: "Curso Python",
        descripcion: 'Potencia tu lógica y data science',
    },
    {
        id: "curso-react",
        titulo: "Curso React",
        descripcion: 'Construye interfaces de usuario',
    },
    {
        id: "curso-sql",
        titulo: "Curso SQL",
        descripcion: 'Gestión y consulta de bases de datos',
    },
    {
        id: "curso-next.js",
        titulo: "Curso Next.js",
        descripcion: 'Desarrollo web con React y más',
    },
    {
        id: "curso-java",
        titulo: "Curso Java",
        descripcion: 'Desarrollo de apps y sistemas',
    },
    {
        id: "curso-csharp",
        titulo: "Curso C#",
        descripcion: 'Programación .NET y videojuegos',
    },
    {
        id: "curso-php",
        titulo: "Curso PHP",
        descripcion: 'Desarrollo web backend',
    },
    {
        id: "curso-typescript",
        titulo: "Curso TypeScript",
        descripcion: 'JavaScript con tipado estricto',
    },
    {
        id: "curso-golang",
        titulo: "Curso Go",
        descripcion: 'Rendimiento y concurrencia',
    },
];


//obtener referencia del contenedor, que siempre es la base para poder crear un innerhtml .. 
const contenedorTarjetas = document.getElementById("contenedorCards")


//hago un recorrido de los datos e inserto al DOM

todasLasCardsDisponibles.forEach(carData => {
    const htmlDelaTarjeta = crearHTMlCard(carData)
    contenedorTarjetas.innerHTML += htmlDelaTarjeta;
})

//funcion para  crear la card del html en el Dom 
function crearHTMlCard(carData, esfavorito = false) {

    //cambiar dinámicamente el boton en base a si es favorito o no
    const textoBoton = esfavorito ? "Quitar" : "Fav"
    const claseBoton = esfavorito ? "removeButton" : "addButton"

    return `
    <div class="card" data-id="${carData.id}" >
        <h3 class="titulo"> ${carData.titulo} </h3>
        <p class="descripcion"> ${carData.descripcion} </p>
        <button class="${claseBoton}"  data-card-id="${carData.id}"  >${textoBoton} </button>
    </div> `;
}

//Lógica para LOCAL STORAGE y manejar favoritos

//obtener datos del local storage

function obtenerFav() {
    const favoritosJson = localStorage.getItem("mis-favoritos")
    return favoritosJson ? JSON.parse(favoritosJson) : [] //ternario
}

//  añadir un elemento de card a la lista de favoritos

function añadirCardFav(idCard) {
    let favoritos = obtenerFav(); //ver primero si está vacio o que favoritos hay
    if (favoritos.includes(idCard)) {
        console.log(`Ya está en fav ${idCard} , agregue otro`);
    } else {
        favoritos.push(idCard)
    }
    console.log("estado actual:" + favoritos);
    guardarFavoritos(favoritos)

    /* 
    Esta es la relación que tienen de asociación, para que cuando pueda añadir la card mediante su ID , pueda setearse el local storage en "GUARDAR FAVORITO", y luego también llamamos a "MOSTRARCARDFAV", osea que cada vez que se añade uno, se setea el local storage, y a su vez le decimos mostranos... 
    */

    mostrarCardsFav() //mostrar al añadir mismo
}

//

function guardarFavoritos(favoritosArray) {
    //convertir el array a json (texto) 
    let favoritosGuardados = localStorage.setItem("mis-favoritos", JSON.stringify(favoritosArray));
    console.log("ese favorito se guardo" + favoritosGuardados);
}



//Funcion para eliminar 
//uso el patron de INMUTABILIDAD , para filter
// !== mantener los que no coincidan (es legible para expresar la idea de quitar, porque filter esta diseñado para incluir aquellos que pasen la condición), o la opción === eliminar, más usar otros métodos que ayuden a quitar del array original

function eliminarFav(idFav) {
    let verFavoritos = obtenerFav();
    let nuevosFavoritos = verFavoritos.filter(cadaIdFav => cadaIdFav !== idFav)
    console.log("Estado actual nuevos favoritos: " + nuevosFavoritos);
    guardarFavoritos(nuevosFavoritos)
}


/* 
Este evento 
*/
document.addEventListener("click", (e) => {
    let buttonClase = e.target
    let isButton = e.target.tagName;
    let data = e.target.dataset.cardId
    if (isButton === "BUTTON" && data) {
        console.log(buttonClase.classList);
        if (buttonClase.classList.contains("addButton")) {
            añadirCardFav(data)
            console.log(`se añadio ${data}`);
        } else if (buttonClase.classList.contains("removeButton")) {
            eliminarFav(data)
            console.log(`se elimino ${data}`);
        }
    }
    mostrarCardsFav()

})


//al ser una funcion flecha no uso THIS para acceder , sino uso el objeto esuchador del evento "e", cada evento recibe un objeto como su primer argumento lo que hace que pueda acceder a que parte esta escuchando.. y tiene un elemento "target" como "PROPIEDAD" que se refiere al DOM que originó el evento.. SI FUESE una Funcion Tradicional acepta THIS del objeto. 


// FUNCION PARA MOSTRAR MIS FAVORITOS 
/* 
uso el metodo find() para encontrar dentro de mi array general, accediendo al ID, por eso card.id porque accede a ese ID y comparo con el ID obtenido por los favoritos que estan guardados, asi obtengo la info completa de la card..  
acordarse de setearel html con comillas del innethtml de contenedor
*/

let contenedorFav = document.getElementById("contenedorFavoritos");
//evento para que cuando actualice el dom completo, y obtenga todos los datos, etc, se pueda mostrar las card fav , para que no haya fallos
document.addEventListener("DOMContentLoaded", mostrarCardsFav)

function mostrarCardsFav() {
    const idsFavorito = obtenerFav();

    contenedorFav.innerHTML = "";

    if (idsFavorito.length === 0) {
        contenedorFav.innerHTML = ` <p> No tiene favoritos aún </p> `
        return;
    }

    idsFavorito.forEach(cadaId => {
        let cursoEncontrado = todasLasCardsDisponibles.find(card => card.id === cadaId)

        if (cursoEncontrado) {
            const htmlCardFav = crearHTMlCard(cursoEncontrado, true)
            contenedorFav.innerHTML += htmlCardFav
        }
    })

}


/* 
//FUNCION A TENER EN CUENTA PARA ENTENDER LOS RE-RENDERIZADOS
// Función auxiliar para re-renderizar toda la UI relevante
function actualizarUI() {
    mostrarTodasLasCards(); // Vuelve a dibujar todas las tarjetas
    mostrarCardsFav();      // Vuelve a dibujar la sección de favoritos
}

*/