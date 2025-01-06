// UserService.java
package dev_eddy.fintech_loan_app.services;

import dev_eddy.fintech_loan_app.dtos.CreateUserDTO;
import dev_eddy.fintech_loan_app.dtos.UserDTO;
import dev_eddy.fintech_loan_app.entity.User;
import dev_eddy.fintech_loan_app.exceptions.ResourceNotFoundException;
import dev_eddy.fintech_loan_app.exceptions.EmailAlreadyExistsException;
import dev_eddy.fintech_loan_app.repository.UserRepository;
import dev_eddy.fintech_loan_app.mappers.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Transactional
public class UserService  {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;


    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;

    }


    public UserDTO createUser(CreateUserDTO createUserDTO) {
        logger.debug("Creating user with email: {} and role: {}", 
            createUserDTO.getEmail(), 
            createUserDTO.getRoles() 
        );
        
        // For development/testing only - remove in production
        logger.debug("Raw password: {}", createUserDTO.getPassword());

        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + createUserDTO.getEmail());
        }

        User user = userMapper.toEntity(createUserDTO);
        user.setPassword(createUserDTO.getPassword());
        user.setRoles(createUserDTO.getRoles() != null ? createUserDTO.getRoles() : "User");

        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, CreateUserDTO updateUserDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Check if email is being changed and if new email already exists
        if (!user.getEmail().equals(updateUserDTO.getEmail()) &&
                userRepository.existsByEmail(updateUserDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists: " + updateUserDTO.getEmail());
        }

        user.setName(updateUserDTO.getName());
        user.setEmail(updateUserDTO.getEmail());
        user.setPhoneNumber(updateUserDTO.getPhoneNumber());

        if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
            user.setPassword(updateUserDTO.getPassword());
        }

        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    
    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return userMapper.toDTO(user);
    }
    
}
