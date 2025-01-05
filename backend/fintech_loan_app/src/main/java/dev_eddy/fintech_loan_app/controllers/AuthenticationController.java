package dev_eddy.fintech_loan_app.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController // Marks this class as a REST controller
@RequestMapping("/api/auth") // Base path for authentication-related endpoints
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService; // Inject the authentication service

    @PostMapping("/register") // Handles user registration
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        authenticationService.register(registerDTO); // Call the service layer to register user
        return ResponseEntity.ok("User registered successfully."); // Respond with success message
    }

    @PostMapping("/login") // Handles user login
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        String token = authenticationService.login(loginDTO); // Call the service layer to log in and get JWT
        return ResponseEntity.ok(token); // Respond with the generated JWT
    }
}
