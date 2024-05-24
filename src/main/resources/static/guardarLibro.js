function saveBookDB(bookId) {
    // Obtener los datos del libro correspondiente al ID

    findBookById(bookId)
        .then(book => {

            // Crear un objeto con los datos del libro en el formato esperado por el servidor

            const autores = book.authors.length > 0 ? book.authors : ["Desconocido"];



            const libroData = {
                titulo: book.title,
                autores: autores.map(autor => ({
                    nombre: autor.nombre,
                    apellido: autor.apellido,
                    anyoNacimiento: autor.birth_year,
                    anyoMuerte: autor.death_year
                })),
                idioma: book.idiomasComoString,
                imagen: book.formats.urlImagen,
                texto: book.formats.urlTexto,
                numeroDeDescargas: book.download_count
            };
            // Verificar si el libro ya existe en la base de datos
            fetch(`/libroExiste/${libroData.titulo}`)
                .then(response => {
                    if (response.ok) {
                        // El libro ya existe en la base de datos
                        return response.json().then(libroExistente => {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Libro existente',
                                text: `El libro "${libroExistente.titulo}" ya está registrado en la base de datos.`,
                            });
                        });
                    } else {
                        // El libro no existe en la base de datos, proceder a guardarlo
                        return guardarLibroEnBaseDeDatos(libroData);
                    }
                })
                .catch(error => {
                    console.error('Error al verificar el libro:', error);
                });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al obtener los datos del libro',
            });
            console.error('Error al obtener los datos del libro:', error);
        });


}

// Función auxiliar para encontrar un libro por su ID
async function findBookById(bookId) {
    const response = await fetch(`/find/${bookId}`);
    return await response.json();
}
function guardarLibroEnBaseDeDatos(libroData) {

    fetch('/libros/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(libroData),
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error al guardar el libro');
            }
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data,
            });

        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el libro',
            });
            console.error('Error al guardar el libro:', error);
        });
}