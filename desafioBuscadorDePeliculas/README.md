🎬 Pelis CLI
Una herramienta de línea de comandos para gestionar y explorar películas desde tu terminal. Ideal para organizar tu colección, buscar por criterios personalizados y aplicar filtros flexibles


🧩 Comandos disponibles
| Comando | Descripción | 
| (sin comando) | Muestra todas las películas cargadas en pelis.json | 
| --sort | Ordena las películas por title, rating o year | 
| --search | Busca películas cuyo título contenga el texto ingresado | 
| --tag | Filtra películas por tag (género, estilo, etc.) con normalización de texto | 


📁 Ejemplos de uso
node index.js --sort title
node index.js --sort rating
node index.js --search "Matrix"
node index.js --tag "ciencia ficción"

🧠 Lógica y estructura
- Modularización: Separación entre index.js (controlador principal) y pelis.js (lógica de negocio).
- Manejo de archivos: Lectura asincrónica de pelis.json usando fs.promises.
- Validación de argumentos: Mensajes claros ante errores o argumentos faltantes.
- Filtrado inclusivo: Búsqueda por texto parcial y normalización de acentos en tags.




🛠️ Tecnologías utilizadas
- Node.js
- fs (manejo de archivos)
- Promesas y async/await
- process.argv para CLI
- console.table para salida visual



