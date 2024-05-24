package org.example.literAlura.dto;

import lombok.Data;

import java.util.List;

@Data
public class LibroDTO {

    String titulo;
    List<AutorDTO> autores;
    String idioma;
    String imagen;
    String texto;
    Integer numeroDeDescargas;

}