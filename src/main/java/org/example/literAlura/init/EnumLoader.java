package org.example.literAlura.init;


import org.example.literAlura.model.Idioma;
import org.example.literAlura.model.Lenguaje;
import org.example.literAlura.repository.IdiomaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EnumLoader implements CommandLineRunner {

    @Autowired
    private IdiomaRepository idiomaRepository;

    @Override
    public void run(String... args) {
        if (idiomaRepository.count() == 0) {
            for (Lenguaje lenguaje : Lenguaje.values()) {
                Idioma idioma = new Idioma();
                idioma.setNomLenguaje(lenguaje);
                idiomaRepository.save(idioma);
            }
        }
    }

}

