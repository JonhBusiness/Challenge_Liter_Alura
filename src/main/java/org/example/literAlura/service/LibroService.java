package org.example.literAlura.service;

import org.example.literAlura.dto.AutorDTO;
import org.example.literAlura.dto.LibroDTO;
import org.example.literAlura.model.Autor;
import org.example.literAlura.model.Idioma;
import org.example.literAlura.model.Lenguaje;
import org.example.literAlura.model.Libro;
import org.example.literAlura.repository.IdiomaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    private final IdiomaRepository idiomaRepository;

    public LibroService(IdiomaRepository idiomaRepository) {
        this.idiomaRepository = idiomaRepository;
    }

    public Libro ConvertirDTOAEntity(LibroDTO libroDTO) {
        Libro newLibro = new Libro();

        newLibro.setTitulo(libroDTO.getTitulo());

        List<Autor> autores = new ArrayList<>();

        for (AutorDTO resAutor : libroDTO.getAutores()) {
            Autor autor = new Autor();
            autor.setNombre(resAutor.getNombre());
            autor.setApellido(resAutor.getApellido());
            autor.setAnyoNacimiento(resAutor.getAnyoNacimiento());
            autor.setAnyoFallecimiento(resAutor.getAnyoMuerte());
            autores.add(autor);
        }

        newLibro.setAutores(autores);
        List<Idioma> idiomas = new ArrayList<>();
        System.out.println("antes: "+libroDTO.getIdioma());
           String[] idiomasStr = libroDTO.getIdioma().split(",");
        System.out.println("despues: " +idiomasStr.length);
           for (String resIdiomas : idiomasStr) {
               System.out.println("idioma: "+resIdiomas.trim());
               Lenguaje lenguaje = Lenguaje.fromString(resIdiomas.trim());
               verificarIdiomaDB(lenguaje, idiomas);
           }


        newLibro.setIdiomas(idiomas);
        newLibro.setImagen(libroDTO.getImagen());
        newLibro.setTexto(libroDTO.getTexto());
        newLibro.setNumeroDescargas(libroDTO.getNumeroDeDescargas());

        return newLibro;
    }

    private void verificarIdiomaDB(Lenguaje lenguaje, List<Idioma> idiomas) {
        Optional<Idioma> idiomaExist = idiomaRepository.findByNomLenguaje(lenguaje);
        if (idiomaExist.isPresent()) {
            if (!idiomas.contains(idiomaExist.get())) {
                idiomas.add(idiomaExist.get());
            } else {
                System.out.println("Ya esta en la lista de idiomas");
            }
        } else {
            System.out.println("No existe idioma");
        }
    }
}
