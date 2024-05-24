// Función reutilizable para mostrar libros
function mostrarLibros(libros) {
    const resultadosContenedor = document.querySelector('.contenedorResult');
    const resultadosCount = document.querySelector(".numResult");

    // Limpiar los resultados anteriores
    resultadosContenedor.innerHTML = '';

    if (libros.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron libros.',
        });
        resultadosCount.textContent = `Mostrando 0 resultados`;
    } else {
        // Mostrar la cantidad de resultados
        resultadosCount.textContent = `Mostrando ${libros.length} resultados`;

        // Generar el HTML para cada libro
        libros.forEach((libro) => {
            const idiomasHTML = libro.idiomas.map(idio => idio.nomLenguaje).join(', ');
            const libroHTML = `
        <div class="card shadow bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="block card-image">
            <img src="${libro.imagen || 'https://ctppxztfz8.execute-api.us-west-2.amazonaws.com/v1/photo-server/products/empty-img.jpg'}" alt="Book cover" width="300" height="400" class="w-full" />
          </div>
          <div class="p-4 card-description">
            <p class="font-semibold text-blue-900">Lenguajes: <span class="mt-2 text-gray-600">${idiomasHTML}</span></p>
            <p class="font-semibold text-blue-900">Descargas: <span class="mt-2 text-gray-600">${libro.numeroDescargas}</span></p>
            <a href="${libro.texto}" class="font-semibold text-blue-900 hover:underline">Leer</a>
          </div>
        </div>
      `;

            resultadosContenedor.insertAdjacentHTML('beforeend', libroHTML);
        });
    }
}

// Obtener todos los libros
const allBD = document.getElementById('all-DB');
allBD.addEventListener('click', function (event) {
    event.preventDefault();

    fetch('/myLibrosDB')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            mostrarLibros(data);
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener los libros.',
            });
            console.error('Error:', error);
        });
});

// Obtener los 10 libros más descargados
const mostDownloads = document.getElementById('most-downloads');
mostDownloads.addEventListener('click', function (event) {
    event.preventDefault();

    fetch('/myLibrosDB/top10')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            mostrarLibros(data);
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener los libros más descargados.',
            });
            console.error('Error:', error);
        });
});
// Obtener libros por idioma
const idiomaButtons = document.querySelectorAll('input[name="idioma"]');
let selectedText = '';
idiomaButtons.forEach(button => {
    button.addEventListener('change', function () {
        selectedText = button.parentElement.textContent.trim();
        fetch(`/myLibrosDB/lenguaje/${selectedText}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                mostrarLibros(data);
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al obtener los libros por idioma.',
                });
                console.error('Error:', error);
            });
    });
});
// Selecciona el botón de ordenar
const ordenarBoton = document.getElementById('ordenar-boton');
const textoBoton = document.getElementById('texto-boton');

// Variable para mantener el estado del orden actual
let ordenAscendente = true; // Comienza con orden ascendente

// Agrega un controlador de eventos de clic al botón
ordenarBoton.addEventListener('click', function (event) {
    event.preventDefault(); // Evita que el botón recargue la página

    // Obtiene el contenedor de resultados
    const resultadosContenedor = document.querySelector('.contenedorResult');

    // Invierte el orden de los elementos dentro del contenedor
    const librosElementos = Array.from(resultadosContenedor.children).reverse();

    // Limpia el contenedor
    resultadosContenedor.innerHTML = '';

    // Agrega los elementos en el nuevo orden
    librosElementos.forEach(libro => {
        resultadosContenedor.appendChild(libro);
    });

    // Actualiza el texto del botón
    if (ordenAscendente) {
        textoBoton.textContent = 'Descendente';
    } else {
        textoBoton.textContent = 'Ascendente';
    }

    // Cambia el estado del orden para el próximo clic
    ordenAscendente = !ordenAscendente;
});