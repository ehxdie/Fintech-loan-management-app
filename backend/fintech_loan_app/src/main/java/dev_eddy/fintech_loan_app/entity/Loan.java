package dev_eddy.fintech_loan_app.entity;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double amount;
    private Integer tenure; // duration in months
    private Double interestRate;
    private String status; // e.g., APPLIED, APPROVED, REJECTED, REPAID

    private LocalDateTime appliedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime repaidAt;

    private Double calculatedInterestRate; // Optional, dynamically calculated

    // Getters and setters
}
