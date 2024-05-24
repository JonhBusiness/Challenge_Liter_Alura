package org.example.literAlura.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ResultResponse(
        @JsonAlias("results")
        List<LibroResponse> results,
        @JsonAlias("count")
        Integer count,
        @JsonAlias("next")
        String next,
        @JsonAlias("previous")
        String previous
) {
}
