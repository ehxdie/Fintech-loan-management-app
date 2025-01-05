package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.RoleDto;
import dev_eddy.fintech_loan_app.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    
    private final RoleService roleService;
    
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }
    
    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRole(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRole(id));
    }
    
    @PostMapping
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        return new ResponseEntity<>(roleService.createRole(roleDto), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable Long id, @RequestBody RoleDto roleDto) {
        return ResponseEntity.ok(roleService.updateRole(id, roleDto));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
