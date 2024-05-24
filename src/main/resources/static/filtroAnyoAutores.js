
// Añadir escucha de eventos para los radios de años
document.querySelectorAll('input[name="anyo"]').forEach(radio => {

    radio.addEventListener('change', function() {
        // Obtener el valor del rango de años seleccionado
        const selectedValue = this.value;

        // Obtener los años del rango
        let anyo1, anyo2;
        switch (selectedValue) {
            case '2000-actualidad':
                anyo1 = 2000;
                anyo2 = new Date().getFullYear();
                break;
            case '1900-2000':
                anyo1 = 1900;
                anyo2 = 2000;
                break;
            case '1500-1900':
                anyo1 = 1500;
                anyo2 = 1900;
                break;
            case 'antes-1500':
                anyo1 = -499;
                anyo2 = 1500;
                break;
        }
        // Realizar la solicitud al backend
        buscarAutoresPorAnyo(anyo1, anyo2);
    });
});

function buscarAutoresPorAnyo(anyo1, anyo2) {
    console.log(`Buscando autores entre los años: ${anyo1} y ${anyo2}`);
    fetch(`/autoresDB/${anyo1}/${anyo2}`)
        .then(response => response.json())
        .then(data => {
            mostrarResultadosAutoresbyAnyo(data);
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Ha ocurrido un error de conexión. Por favor, verifica tu conexión a Internet e inténtalo de nuevo más tarde.',
            });
            console.error('Error de red:', error);
        });
}
function mostrarResultadosAutoresbyAnyo(dataDB) {
    const resultadosContenedor = document.querySelector('.contenedorResultados');
    const resultadosCount = document.querySelector(".numResultados");

    // Limpiar los resultados anteriores
    resultadosContenedor.innerHTML = '';


    if (dataDB.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron autores en ese determinado año .',
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