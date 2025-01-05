package dev_eddy.fintech_loan_app.dtos;

import java.time.LocalDateTime;

public class LoanDTO {
    private Long id;
    private Long userId;
    private Double amount;
    private Integer tenure;
    private Double interestRate;
    private String status;
    private LocalDateTime appliedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime repaidAt;
    private LocalDateTime nextPaymentDate;
    private Double remainingBalance;
    private Double monthlyPayment;
    private String purpose;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Integer getTenure() { return tenure; }
    public void setTenure(Integer tenure) { this.tenure = tenure; }

    public Double getInterestRate() { return interestRate; }
    public void setInterestRate(Double interestRate) { this.interestRate = interestRate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }

    public LocalDateTime getRepaidAt() { return repaidAt; }
    public void setRepaidAt(LocalDateTime repaidAt) { this.repaidAt = repaidAt; }

    public LocalDateTime getNextPaymentDate() { return nextPaymentDate; }
    public void setNextPaymentDate(LocalDateTime nextPaymentDate) { this.nextPaymentDate = nextPaymentDate; }

    public Double getRemainingBalance() { return remainingBalance; }
    public void setRemainingBalance(Double remainingBalance) { this.remainingBalance = remainingBalance; }

    public Double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(Double monthlyPayment) { this.monthlyPayment = monthlyPayment; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
