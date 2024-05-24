package org.example.literAlura.controller;


import org.example.literAlura.model.Lenguaje;
import org.example.literAlura.model.Libro;
import org.example.literAlura.repository.IdiomaRepository;
import org.example.literAlura.repository.LibroRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class LibrosController {
    private final LibroRepository libroRepository;
    private final IdiomaRepository idiomaRepository;

    public LibrosController(LibroRepository libroRepository, IdiomaRepository idiomaRepository) {
        this.libroRepository = libroRepository;
        this.idiomaRepository = idiomaRepository;
    }
//CargarBD Libros
    @GetMapping("/myLibros")
    public String getAllLibros(Model model) {
        List<Libro> libros=libroRepository.findAll();
        List<Lenguaje> lenguajes=idiomaRepository.findAllLenguajes();
        Integer registrados=libroRepository.numberOfLibros();
        model.addAttribute("libros", libros);
        model.addAttribute("lenguajes", lenguajes);
        model.addAttribute("registrados", registrados);
        return "viewMyLibros";
    }
  //Cargar libros Container
    @GetMapping(value = "/myLibrosDB", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Libro> getAllLibros() {
        List<Libro> libros = libroRepository.findAll();
        return libros;
    }

    //Buscar por titulo
    @GetMapping(value = "/librosDB/{nombre}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Libro> getLibro(@PathVariable String nombre) {
        List<Libro> libro=libroRepository.findByTituloContaining(nombre);
        for(Libro libro1: libro)
        {
            System.out.println(libro1.getTitulo());
        }

        return libro;
    }

    //Top10Descargas
    @GetMapping(value = "/myLibrosDB/top10", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Libro> getTop10() {
        List<Libro> libros = libroRepository.findTop3ByOrderByNumeroDescargasDesc();
        return libros;
    }

    //ListPorLenguaje
    @GetMapping(value = "/myLibrosDB/lenguaje/{lenguaje}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Libro> getLibrosByIdioma(@PathVariable String lenguaje) {
        System.out.println("Lenguaje: "+lenguaje);
        Lenguaje lenguajeEnum = Lenguaje.fromString(lenguaje.toLowerCase());
        List<Libro> libros = libroRepository.findLibrosByIdioma(lenguajeEnum);
        return libros;
    }
}
