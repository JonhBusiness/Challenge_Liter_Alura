package org.example.literAlura.model;

import lombok.Getter;

@Getter
public enum Lenguaje {
    ES("es"),
    EN("en"),
    TL("tl"),
    FR("fr");

    private String lenguajeEnum;

    Lenguaje(String valor) {
        this.lenguajeEnum = valor;
    }

    public static Lenguaje fromString(String text) {
        for (Lenguaje lenguaje : Lenguaje.values()) {
            if (lenguaje.lenguajeEnum.equalsIgnoreCase(text)) {
                return lenguaje;
            }
        }
        throw new IllegalArgumentException("Ninguna lenguaje encontrado: " + text);
    }
}

