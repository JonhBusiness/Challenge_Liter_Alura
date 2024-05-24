package org.example.literAlura.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ConsumoAPI {
    private final OkHttpClient httpClient;

    public ConsumoAPI() {
        this.httpClient = new OkHttpClient();
    }

    public String obtenerDatos(String url) {
        Request request = new Request.Builder()
                .url(url)
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            assert response.body() != null;
            return response.body().string();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

