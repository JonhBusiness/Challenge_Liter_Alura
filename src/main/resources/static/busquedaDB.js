// Selección de elementos
const searchForm = document.getElementById('searchForm');
const bookTitleInput = document.getElementById('busquedaInput');
const searchButton = document.getElementById('btnEnviar');
// Controlador de evento para el envío del formulario
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe
    // Ejecuta la acción de búsqueda
    buscarLibros();
});

// Controlador de evento para la tecla "Enter" en el campo de entrada
bookTitleInput.addEventListener('keypress', function (event) {
    // Verifica si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado
        // Ejecuta la acción de búsqueda
        buscarLibros();
    }
});

// Función de búsqueda de libros
function buscarLibros() {
    // Aquí puedes escribir el código para ejecutar la acción de búsqueda
    const searchTerm = bookTitleInput.value.trim();
    console.log('Buscando libros con el término:', searchTerm);
    if (searchTerm === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingresa el título del libro que deseas buscar.',
        });
    } else {
        // Cambiar el texto del botón y desactivarlo
        searchButton.textContent = 'Buscando...';
        searchButton.disabled = true;
        // Luego de buscar, podrías realizar otras acciones, como mostrar resultados o actualizar la interfaz

        fetch(`/librosDB/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Revertir los cambios en el botón
                searchButton.textContent = 'Buscar';
                searchButton.disabled = false;
                // Manejar la respuesta aquí

                mostrarResultadosHTML(data);
            })

            .catch(error => {
                // Revertir los cambios en el botón
                searchButton.textContent = 'Buscar';
                searchButton.disabled = false;

                // Manejar el error de red genérico
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Ha ocurrido un error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.',
                });
                console.error('Error de red:', error);
            });
    }
}

function mostrarResultadosHTML(dataDB) {
    const resultadosContenedor = document.querySelector('.contenedorResult');
    const resultadosCount = document.querySelector(".numResult");

    // Limpiar los resultados anteriores
    resultadosContenedor.innerHTML = '';

console.log(dataDB)
    if (dataDB.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron libros con ese título.',
        });
        resultadosCount.textContent = `Mostrando ${dataDB.length} resultados`;
    } else {
        // Mostrar la cantidad de resultados
      resultadosCount.textContent = `Mostrando ${dataDB.length} resultados`;


        // Generar el HTML para cada libro

        dataDB.forEach((libro) => {
            const idiomasHTML = libro.idiomas.map(idio => idio.nomLenguaje).join(', '); // Asumiendo que cada objeto de idioma tiene una propiedad 'nomLenguaje'
            const libroHTML = `
                <div  class="card shadow bg-white rounded-lg shadow-sm overflow-hidden">
                        <div class="block card-image">
                            <img src="${libro.imagen || 'https://ctppxztfz8.execute-api.us-west-2.amazonaws.com/v1/photo-server/products/empty-img.jpg'}" alt="Book cover" width="300" height="400" class="w-full" />
                        </div>
                        <div class="p-4 card-description">
                            <p class="font-semibold text-blue-900">Lenguajes: <span class="mt-2 text-gray-600">${idiomasHTML}</span></p>
                            <p class="font-semibold text-blue-900">Descargas: <span   class="mt-2 text-gray-600">${libro.numeroDescargas}</span></p>
                            <a href="${libro.texto}" class="font-semibold text-blue-900 hover:underline">Leer</a>
                        </div>
                    </div>
          
    `;

            resultadosContenedor.insertAdjacentHTML('beforeend', libroHTML);

        });

    }

}



