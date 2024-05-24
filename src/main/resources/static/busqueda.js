// Selección de elementos
const searchForm = document.getElementById('searchForm');
const bookTitleInput = document.getElementById('bookTitleInput');
const searchButton = document.querySelector('button[type="submit"]');
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

        fetch(`/libros/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Revertir los cambios en el botón
                searchButton.textContent = 'Buscar';
                searchButton.disabled = false;
                // Manejar la respuesta aquí
                mostrarResultados(data);
            })
            .catch(error => {
                // Revertir los cambios en el botón
                searchButton.textContent = 'Buscar';
                searchButton.disabled = false;

                // Manejar el error de tiempo de espera
                if (error.message.includes('timeout')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Tiempo de espera agotado',
                        text: 'La solicitud de búsqueda ha superado el tiempo de espera. Por favor, inténtalo de nuevo más tarde.',
                    });
                } else {
                    console.error('Error:', error);
                }
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

function mostrarResultados(data) {
    const resultadosContainer = document.querySelector('.containerResult');
    const resultadosCount = document.querySelector(".resultCount");

    // Limpiar los resultados anteriores
    resultadosContainer.innerHTML = '';
    // Verificar si la respuesta es válida
    if (!data || data.error) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el servidor',
            text: 'Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.',
        });
        return; // Detener la ejecución de la función
    }

    if (data.count === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron libros con ese título.',
        });
    } else {
        // Mostrar la cantidad de resultados
        resultadosCount.textContent = `Mostrando ${data.count} resultados`;

        // Generar el HTML para cada libro

        data.results.forEach((libro, index) => {
            const autores = libro.authors.length > 0 ? libro.authors.map(autor => `${autor.nombre} ${autor.apellido}`) : ["Desconocido"];

            const uniqueId = `book-dialog-${index}`;
            const libroHTML = `
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="block card-block relative flex flex-col h-64 overflow-hidden text-gray-700 transition-opacity bg-white shadow-md cursor-pointer w-96 rounded-xl bg-clip-border hover:opacity-90"
                     data-dialog-target="${uniqueId}">
                   <img src="${libro.formats.urlImagen || 'https://ctppxztfz8.execute-api.us-west-2.amazonaws.com/v1/photo-server/products/empty-img.jpg'}" alt="Book cover" width="300" height="400" class="w-full" />
                </div>

                <div class="p-4 pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
                     data-dialog-backdrop="${uniqueId}" data-dialog-backdrop-close="true">
                    <div class="relative m-4 max-w-[75%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
                         role="dialog" data-dialog="${uniqueId}">
                        <div class="m-2 bg-white rounded-lg shadow-sm overflow-hidden grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 ">
                            <div class="block card-block grid gap-4 md:gap-8">
                               <img src="${libro.formats.urlImagen || 'https://ctppxztfz8.execute-api.us-west-2.amazonaws.com/v1/photo-server/products/empty-img.jpg'}" alt="Book cover" width="300" height="400" class="w-full" />
                            </div>
                            <div class="p-4 m-auto">
                                <h3 class=" font-semibold text-blue-900">Título: <span class="text-lg font-semibold text-gray-900">${libro.title}</span> </h3>
                                <p class=" font-semibold text-blue-900">Autores: <span class="mt-2 text-gray-600 ">${autores}</span></p>
                                <p  class=" font-semibold text-blue-900">Lenguajes: <span class="mt-2 text-gray-600 ">${libro.languages.join(', ')}</span> </p>
                                <p class=" font-semibold text-blue-900">Descargas: <span class="mt-2 text-gray-600 ">${libro.download_count}</span></p>
                            </div>
                            <button onclick="saveBookDB('${libro.id}')"
                                    class="bg-blue-100 items-center justify-center whitespace-nowrap rounded-md font-bold text-blue-400 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto"
                            >
                                Guardar en BD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;

            resultadosContainer.insertAdjacentHTML('beforeend', libroHTML);
            // Agregar los controladores de eventos a los nuevos elementos
            agregarControladorEventosModal();
        });

    }

}

function agregarControladorEventosModal() {
    const dialogTargets = document.querySelectorAll('[data-dialog-target]');
    const dialogBackdrops = document.querySelectorAll('[data-dialog-backdrop]');

    dialogTargets.forEach(target => {
        target.addEventListener('click', () => {
            const dialogId = target.getAttribute('data-dialog-target');
            const dialog = document.querySelector(`[data-dialog="${dialogId}"]`);
            const backdrop = document.querySelector(`[data-dialog-backdrop="${dialogId}"]`);

            if (dialog && backdrop) {
                backdrop.classList.remove('opacity-0', 'pointer-events-none');
                dialog.classList.remove('opacity-0');
            }
        });
    });

    dialogBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-dialog-backdrop-close') === 'true') {
                backdrop.classList.add('opacity-0', 'pointer-events-none');
                const dialogId = backdrop.getAttribute('data-dialog-backdrop');
                const dialog = document.querySelector(`[data-dialog="${dialogId}"]`);
                if (dialog) {
                    dialog.classList.add('opacity-0');
                }
            }
        });
    });
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', agregarControladorEventosModal);