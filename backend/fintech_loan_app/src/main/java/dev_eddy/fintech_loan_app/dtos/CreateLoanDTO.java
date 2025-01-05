package dev_eddy.fintech_loan_app.dtos;

import jakarta.validation.constraints.*;

public class CreateLoanDTO {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Loan amount is required")
    @Positive(message = "Loan amount must be positive")
    private Double amount;

    @NotNull(message = "Loan tenure is required")
    @Min(value = 1, message = "Tenure must be at least 1 month")
    @Max(value = 60, message = "Tenure cannot exceed 60 months")
    private Integer tenure;

    @NotBlank(message = "Loan purpose is required")
    private String purpose;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Integer getTenure() { return tenure; }
    public void setTenure(Integer tenure) { this.tenure = tenure; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
}
