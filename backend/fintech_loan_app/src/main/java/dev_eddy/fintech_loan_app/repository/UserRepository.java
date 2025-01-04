package dev_eddy.fintech_loan_app.repository;

import dev_eddy.fintech_loan_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Find user by email (for login/authentication)
    Optional<User> findByEmail(String email);

    // Check if email exists (for registration)
    boolean existsByEmail(String email);

    // Find users by name containing (for search functionality)
    List<User> findByNameContainingIgnoreCase(String name);

    // Find by phone number
    Optional<User> findByPhoneNumber(String phoneNumber);

    // Find users by role
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName")
    List<User> findByRoleName(@Param("roleName") String roleName);

    // Find users created after a certain date
    @Query("SELECT u FROM User u WHERE u.createdAt >= :date")
    List<User> findRecentUsers(@Param("date") LocalDateTime date);

    // Custom query to find users with specific role and name pattern
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName AND u.name LIKE %:namePattern%")
    List<User> findByRoleAndNamePattern(@Param("roleName") String roleName, @Param("namePattern") String namePattern);

    // Find users without any roles
    @Query("SELECT u FROM User u WHERE u.roles IS EMPTY")
    List<User> findUsersWithoutRoles();
}