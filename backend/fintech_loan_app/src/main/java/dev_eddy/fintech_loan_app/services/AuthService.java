package dev_eddy.fintech_loan_app.services;

import dev_eddy.fintech_loan_app.dtos.LoginDTO;
import dev_eddy.fintech_loan_app.dtos.UserDTO;
import dev_eddy.fintech_loan_app.entity.User;
import dev_eddy.fintech_loan_app.repository.UserRepository;
import dev_eddy.fintech_loan_app.exceptions.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO authenticate(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new AuthenticationException("Invalid email or password"));

        // In a real application, you should use password encoding
        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }

        return convertToDTO(user);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}