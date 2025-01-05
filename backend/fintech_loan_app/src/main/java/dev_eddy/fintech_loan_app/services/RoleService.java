package dev_eddy.fintech_loan_app.services;

import dev_eddy.fintech_loan_app.dtos.RoleDto;
import dev_eddy.fintech_loan_app.entity.Role;
import dev_eddy.fintech_loan_app.exceptions.RoleAlreadyExistsException;
import dev_eddy.fintech_loan_app.exceptions.RoleNotFoundException;
import dev_eddy.fintech_loan_app.mappers.RoleMapper;
import dev_eddy.fintech_loan_app.repository.RoleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    
    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;
    
    public RoleService(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }
    
    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
            .map(roleMapper::toDto)
            .collect(Collectors.toList());
    }
    
    public RoleDto getRole(Long id) {
        Role role = roleRepository.findById(id)
            .orElseThrow(() -> new RoleNotFoundException("Role not found with id: " + id));
        return roleMapper.toDto(role);
    }
    
    public RoleDto createRole(RoleDto roleDto) {
        if (roleRepository.existsByName(roleDto.name())) {
            throw new RoleAlreadyExistsException("Role already exists with name: " + roleDto.name());
        }
        Role role = roleMapper.toEntity(roleDto);
        Role savedRole = roleRepository.save(role);
        return roleMapper.toDto(savedRole);
    }
    
    public RoleDto updateRole(Long id, RoleDto roleDto) {
        Role role = roleRepository.findById(id)
            .orElseThrow(() -> new RoleNotFoundException("Role not found with id: " + id));
        
        role.setName(roleDto.name());
        role.setDescription(roleDto.description());
        
        Role updatedRole = roleRepository.save(role);
        return roleMapper.toDto(updatedRole);
    }
    
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new RoleNotFoundException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }
}
