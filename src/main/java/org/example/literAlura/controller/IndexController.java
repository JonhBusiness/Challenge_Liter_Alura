package org.example.literAlura.controller;

import org.example.literAlura.dto.LibroDTO;
import org.example.literAlura.model.Libro;
import org.example.literAlura.repository.LibroRepository;
import org.example.literAlura.response.LibroResponse;
import org.example.literAlura.response.ResultResponse;
import org.example.literAlura.service.ConsumoAPI;
import org.example.literAlura.service.ConvierteDatosImpl;
import org.example.literAlura.service.LibroService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@Controller
public class IndexController {
    private final ConsumoAPI consumoAPI;
    private final LibroRepository libroRepository;
    private final LibroService libroService;

    public IndexController(ConsumoAPI consumoAPI, LibroRepository libroRepository, LibroService libroService) {
        this.consumoAPI = consumoAPI;
        this.libroRepository = libroRepository;
        this.libroService = libroService;
    }

    //Cargar Pagina
    @GetMapping("/cargar")
    public String cargarLibros(@RequestParam(defaultValue = "1") int pagina, Model model) {
        String url = "https://gutendex.com/books/?page=" + pagina;
        String respuesta = consumoAPI.obtenerDatos(url);
        ConvierteDatosImpl conversor = new ConvierteDatosImpl();
        ResultResponse libros = conversor.obtenerDatos(respuesta, ResultResponse.class);

        int totalPages = (int) Math.ceil((double) libros.count() / 32);
        String nextUrl = libros.next() != null ? "/cargar?page=" + (pagina + 1) : null;
        String prevUrl = libros.previous() != null ? "/cargar?page=" + (pagina - 1) : null;

        model.addAttribute("libros", libros.results());
        model.addAttribute("totalPages", totalPages);
        model.addAttribute("currentPage", pagina);
        model.addAttribute("nextUrl", nextUrl);
        model.addAttribute("prevUrl", prevUrl);

        return "viewIndex";
    }

    //Buscar Por Id
    @GetMapping(value = "/find/{idLibro}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public LibroResponse obtenerLibroPorId(@PathVariable int idLibro) {
        String url = "https://gutendex.com/books/?ids=";
        String respuesta = consumoAPI.obtenerDatos(url + idLibro);
        ConvierteDatosImpl conversor = new ConvierteDatosImpl();
        ResultResponse datos = conversor.obtenerDatos(respuesta, ResultResponse.class);

        return datos.results().get(0);
    }

    //Guardar Libro
    @PostMapping("/libros/guardar")
    public ResponseEntity<String> guardarLibro(@RequestBody LibroDTO libroDTO) {
        System.out.println(libroDTO.toString());
        Libro newLibro = libroService.ConvertirDTOAEntity(libroDTO);
        libroRepository.save(newLibro);
        return ResponseEntity.ok("Libro guardado en la base de datos correctamente");
    }


    //Buscar por titulo
    @GetMapping(value = "/libros/{nombre}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResultResponse getLibro(@PathVariable String nombre) {
        String url = "https://gutendex.com/books/?search=";
        String respuesta = consumoAPI.obtenerDatos(url + nombre.replace(" ", "+"));
        ConvierteDatosImpl conversor = new ConvierteDatosImpl();
        ResultResponse datos = conversor.obtenerDatos(respuesta, ResultResponse.class);

        return datos;
    }

    //Buscar si existe por titulo
    @GetMapping("/libroExiste/{titulo}")
    @ResponseBody
    public ResponseEntity<?> getLibroExist(@PathVariable String titulo) {
        Optional<Libro> libroExist = libroRepository.findByTitulo(titulo);

        if (libroExist.isPresent()) {
            return ResponseEntity.ok(libroExist.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
