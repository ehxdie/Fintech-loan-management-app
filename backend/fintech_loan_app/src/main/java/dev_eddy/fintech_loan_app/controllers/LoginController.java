package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.LoginDTO;
import dev_eddy.fintech_loan_app.dtos.UserDTO;
import dev_eddy.fintech_loan_app.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class LoginController {
    private final AuthService authService;

    @Autowired
    public LoginController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        UserDTO authenticatedUser = authService.authenticate(loginDTO);
        return ResponseEntity.ok(authenticatedUser);
    }
}