package org.example.literAlura.repository;


import org.example.literAlura.model.Lenguaje;
import org.example.literAlura.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface LibroRepository extends JpaRepository<Libro, Long> {
    Optional<Libro> findByTitulo(String titulo);

    @Query("SELECT COUNT(l) FROM tbl_libros l")
    Integer numberOfLibros();

    @Query("SELECT l FROM tbl_libros l WHERE l.titulo ILIKE %:nomTitulo%")
    List<Libro> findByTituloContaining(String nomTitulo);

    List<Libro> findTop3ByOrderByNumeroDescargasDesc();

    @Query("SELECT l FROM tbl_libros l JOIN l.idiomas i WHERE i.nomLenguaje = :lenguaje")
    List<Libro> findLibrosByIdioma(@Param("lenguaje") Lenguaje lenguaje);
}
