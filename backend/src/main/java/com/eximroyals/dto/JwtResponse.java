package com.eximroyals.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;

    public JwtResponse(String accessToken, Long id, String email) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
    }
}
