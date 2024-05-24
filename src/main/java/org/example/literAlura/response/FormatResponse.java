package org.example.literAlura.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FormatResponse(
        @JsonAlias("image/jpeg")
        String urlImagen,
        @JsonAlias("text/html")
        String urlTexto

) {
}
