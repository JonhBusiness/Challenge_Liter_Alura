package org.example.literAlura.controller;


import org.example.literAlura.model.Autor;
import org.example.literAlura.repository.AutorRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class AutoresController {
    private final AutorRepository autorRepository;

    public AutoresController(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }
//Obtener Todos
    @GetMapping("/autores")
    public String obtenerAutores(Model model) {
        List<Autor> autores = autorRepository.findAll();
        Integer resultados = autores.size();
        model.addAttribute("autores", autores);
        model.addAttribute("resultados", resultados);
        return "viewAutores";
    }

    //Buscar por titulo
    @GetMapping(value = "/autoresDB/{nombre}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Autor> obtenerAutor(@PathVariable String nombre) {
        List<Autor> autores = autorRepository.findByNombreOrApellidoContaining(nombre);
        return autores;
    }

    //Buscar por anyos
    @GetMapping(value = "/autoresDB/{anyo1}/{anyo2}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Autor> obtenerAutorPorAnyos(@PathVariable Integer anyo1, @PathVariable Integer anyo2) {
        List<Autor> autores = autorRepository.findByAnyos(anyo1, anyo2);
        return autores;
    }
}
