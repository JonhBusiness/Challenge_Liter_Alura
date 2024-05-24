package org.example.literAlura.repository;


import org.example.literAlura.model.Idioma;
import org.example.literAlura.model.Lenguaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface IdiomaRepository extends JpaRepository<Idioma, Long> {
    Optional<Idioma> findByNomLenguaje(Lenguaje lenguaje);


    @Query("SELECT i.nomLenguaje FROM tbl_idiomas i\n")
    List<Lenguaje> findAllLenguajes();
}

