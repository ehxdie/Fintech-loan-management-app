package dev_eddy.fintech_loan_app.entity;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleName; // e.g., USER, ADMIN, MANAGER
    private String permissions; // A JSON or text field to store role-based access control

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    // Getters and setters
}
