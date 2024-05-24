package org.example.literAlura.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "tbl_autores")
public class Autor {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String apellido;
    private Integer anyoNacimiento;
    private Integer anyoFallecimiento;
    @JsonManagedReference
    @ManyToMany(mappedBy = "autores",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
     List<Libro> libros;
}
