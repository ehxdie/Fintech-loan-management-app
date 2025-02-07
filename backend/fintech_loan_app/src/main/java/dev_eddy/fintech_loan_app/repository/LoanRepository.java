package dev_eddy.fintech_loan_app.repository;
import dev_eddy.fintech_loan_app.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    // You can add custom query methods if needed
    List<Loan> findByUserId(Long userId);

    List<Loan> findByStatus(String status);
}
