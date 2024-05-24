package org.example.literAlura.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "tbl_libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "libro_autores",joinColumns = @JoinColumn(name = "libro_id"),inverseJoinColumns = @JoinColumn(name = "autor_id"))
    @JsonBackReference
    private List<Autor> autores = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "libro_idiomas",joinColumns = @JoinColumn(name = "libro_id"),inverseJoinColumns = @JoinColumn(name = "idioma_id"))
    private List<Idioma> idiomas = new ArrayList<>();

    private String imagen;

    private String texto;

    private Integer numeroDescargas;
}
