package com.tuforms.crud;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://node-server:3000"})
public class MyController {
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/auth")
    public ResponseEntity<String> authenticate(@RequestBody AuthRequest authRequest) {
        String apiUrl = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";
        String requestBody = "{ \"UserName\": \"" + authRequest.getUserName() + "\", \"PassWord\": \"" + authRequest.getPassWord() + "\" }";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Application-Key", "TU6b385dc1f8327e133ed355505488df04cd80b11ff6273eb291fa94ad1a05c456116ca973efcb839f730143f2cb931d4b");

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return ResponseEntity.ok(response.getBody());
            } else {
                String errorMessage = response.getBody();
                return new ResponseEntity<>(errorMessage, HttpStatus.valueOf(response.getStatusCode().value()));
            }

        } catch (HttpClientErrorException ex) {
            String errorMessage = ex.getResponseBodyAsString();
            return new ResponseEntity<>(errorMessage, ex.getStatusCode());
        } catch (Exception ex) {
            String errorMessage = ex.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}