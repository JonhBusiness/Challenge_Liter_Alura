// Selección de elementos
const searchForm = document.getElementById('searchFormAutores');
const bookTitleInput = document.getElementById('inputAutores');
const searchButton = document.getElementById('btn-enviar');
// Controlador de evento para el envío del formulario
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe
    // Ejecuta la acción de búsqueda
    buscarAutores();
});

// Controlador de evento para la tecla "Enter" en el campo de entrada
bookTitleInput.addEventListener('keypress', function (event) {
    // Verifica si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita el comportamiento predeterminado
        // Ejecuta la acción de búsqueda
        buscarAutores();
    }
});

// Función de búsqueda de autores
function buscarAutores() {
    // Aquí puedes escribir el código para ejecutar la acción de búsqueda
    const searchTerm = bookTitleInput.value.trim();
    console.log('Buscando autores con el término:', searchTerm);
    if (searchTerm === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingresa el nombre del autor que deseas buscar.',
        });
    } else {
        // Cambiar el texto del botón y desactivarlo
        searchButton.textContent = 'Buscando...';
        searchButton.disabled = true;
        // Luego de buscar, podrías realizar otras acciones, como mostrar resultados o actualizar la interfaz

        fetch(`/autoresDB/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Revertir los cambios en el botón
                searchButton.textContent = 'Buscar';
                searchButton.disabled = false;
                // Manejar la respuesta aquí

                mostrarResultadosAutores(data);
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

function mostrarResultadosAutores(dataDB) {
    const resultadosContenedor = document.querySelector('.contenedorResultados');
    const resultadosCount = document.querySelector(".numResultados");

    // Limpiar los resultados anteriores
    resultadosContenedor.innerHTML = '';


    if (dataDB.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron autores con ese nombre.',
        });
        resultadosCount.textContent = `Mostrando ${dataDB.length} resultados`;
    } else {
        // Mostrar la cantidad de resultados
        resultadosCount.textContent = `Mostrando ${dataDB.length} resultados`;


        // Generar el HTML para cada autor

        // Generar el HTML para cada autor
        dataDB.forEach((autor) => {
            const autorHTML = `
                <div class="grid gap-8">
                    <div class="flex items-start gap-6">
                        <div>
                            <h3 class="mb-2 text-xl font-bold">Autor: <span class="font-sans">${autor.nombre} ${autor.apellido}</span></h3>
                            <p class="mb-4 text-gray-500 font-serif">Nacimiento: <span>${autor.anyoNacimiento}</span> , Muerte: <span>${autor.anyoFallecimiento}</span></p>
                            <br>
                            <h2 class="mb-2 text-xl font-bold font-mono">Libros</h2>
                            <hr>
                            <br>
                            <div class="grid gap-4">
                                ${autor.libros.map(libro => `
                                    <div class="flex items-start gap-4">
                                        <img src="${libro.imagen}" width="100" height="150" alt="Portada del libro" class="rounded-lg object-cover" style="aspect-ratio: 100 / 150; object-fit: cover" />
                                        <div>
                                            <h2 class="mb-2 text-lg font-bold">Título: <span>${libro.titulo}</span></h2>
                                            <p class="mb-2 text-gray-500 font-serif">Idioma: <span>${libro.idiomas.map(idioma => idioma.nomLenguaje).join(', ')}</span></p>
                                        </div>
                                    </div>
                                    <br>
                                    <hr>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            resultadosContenedor.insertAdjacentHTML('beforeend', autorHTML);
        });

    }

}


