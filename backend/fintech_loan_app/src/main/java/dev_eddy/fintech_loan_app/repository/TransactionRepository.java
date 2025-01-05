package dev_eddy.fintech_loan_app.repository;

import dev_eddy.fintech_loan_app.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // You can add custom query methods if needed
    List<Transaction> findByUserId(Long userId);

    List<Transaction> findByLoanId(Long loanId);

    List<Transaction> findByStatus(String status);

}
