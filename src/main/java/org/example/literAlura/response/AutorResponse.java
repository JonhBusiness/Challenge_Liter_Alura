package org.example.literAlura.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AutorResponse(
        @JsonProperty("name")
        String nombreCompleto,
        @JsonProperty("birth_year")
        Integer anyoNacimiento,
        @JsonProperty("death_year")
        Integer anyoFallecimiento
) {

//        public AutorResponse(
//                @JsonProperty("name") String nombreCompleto,
//                @JsonProperty("birth_year") Integer anyoNacimiento,
//                @JsonProperty("death_year") Integer anyoFallecimiento) {
//                this.nombreCompleto = (nombreCompleto == null || nombreCompleto.isEmpty()) ? "Desconocido" : nombreCompleto;
//                this.anyoNacimiento = anyoNacimiento;
//                this.anyoFallecimiento = anyoFallecimiento;
//        }

        public String getNombre() {
                String[] partes = nombreCompleto.split(", ");
                if (partes.length == 2) {
                        return partes[1];
                }
                return nombreCompleto;
        }

        public String getApellido() {
                String[] partes = nombreCompleto.split(", ");
                if (partes.length == 2) {
                        return partes[0];
                }
                return "";
        }

//        public String ordenaNombreCompleto() {
//                if (!nombreCompleto.isEmpty()) {
//                        return getNombre() + " " + getApellido();
//                } else {
//                        return "Desconocido";
//                }
//        }
}
