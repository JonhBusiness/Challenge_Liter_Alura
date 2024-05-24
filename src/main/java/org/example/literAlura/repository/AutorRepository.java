package org.example.literAlura.repository;


import org.example.literAlura.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AutorRepository extends JpaRepository<Autor, Long> {

    @Query("SELECT a FROM tbl_autores a WHERE a.nombre ILIKE %:nombre% OR a.apellido ILIKE %:nombre%")
    List<Autor> findByNombreOrApellidoContaining(@Param("nombre") String nombre);

    @Query("SELECT a FROM tbl_autores a WHERE a.anyoNacimiento >= :anyo1 AND a.anyoNacimiento <= :anyo2")
    List<Autor> findByAnyos(@Param("anyo1") Integer anyo1, @Param("anyo2") Integer anyo2);

}
