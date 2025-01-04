package dev_eddy.fintech_loan_app.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private Loan loan;

    private String transactionType; // e.g., DISBURSEMENT, REPAYMENT
    private Double amount;
    private LocalDateTime transactionDate;
    private String status; // e.g., PENDING, COMPLETED

    // Getters and setters
}