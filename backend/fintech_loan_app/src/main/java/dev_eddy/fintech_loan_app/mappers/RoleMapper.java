package dev_eddy.fintech_loan_app.mappers;

import dev_eddy.fintech_loan_app.dtos.RoleDto;
import dev_eddy.fintech_loan_app.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    
    public RoleDto toDto(Role role) {
        return new RoleDto(
            role.getId(),
            role.getRole(),
            role.getDescription()
        );
    }
    
    public Role toEntity(RoleDto roleDto) {
        Role role = new Role();
        role.setId(roleDto.id());
        role.setRole(roleDto.name());
        role.setDescription(roleDto.description());
        return role;
    }
}


