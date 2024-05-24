package org.example.literAlura.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record LibroResponse(
        @JsonProperty("id")
        Integer idLibro,
        @JsonProperty("title")
        String titulo,
        @JsonProperty("authors")
        List<AutorResponse> autores,
        @JsonProperty("languages")
        List<String> idiomas,
        @JsonProperty("formats")
        FormatResponse formatos,
        @JsonProperty("download_count")
        Integer numeroDeDescargas
) {
        public String getIdiomasComoString() {
                return String.join(", ", idiomas);
        }
}
