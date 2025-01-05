package dev_eddy.fintech_loan_app.repository;
import dev_eddy.fintech_loan_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods if needed
    User findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.name = :roleName AND u.name LIKE %:namePattern%")
    List<User> findByRoleAndNamePattern(@Param("roleName") String roleName, @Param("namePattern") String namePattern);
}
