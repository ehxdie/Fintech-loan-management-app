package dev_eddy.fintech_loan_app.mappers;

import dev_eddy.fintech_loan_app.dtos.CreateLoanDTO;
import dev_eddy.fintech_loan_app.dtos.LoanDTO;
import dev_eddy.fintech_loan_app.entity.Loan;
import dev_eddy.fintech_loan_app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class LoanMapper {
    
    public LoanDTO toDTO(Loan loan) {
        if (loan == null) return null;

        LoanDTO dto = new LoanDTO();
        dto.setId(loan.getId());
        dto.setUserId(loan.getUser().getId());
        dto.setAmount(loan.getAmount());
        dto.setTenure(loan.getTenure());
        dto.setInterestRate(loan.getInterestRate());
        dto.setStatus(loan.getStatus());
        dto.setAppliedAt(loan.getAppliedAt());
        dto.setApprovedAt(loan.getApprovedAt());
        dto.setRepaidAt(loan.getRepaidAt());
        dto.setNextPaymentDate(loan.getNextPaymentDate());
        dto.setRemainingBalance(loan.getRemainingBalance());
        dto.setMonthlyPayment(loan.getMonthlyPayment());
        dto.setPurpose(loan.getPurpose());
        dto.setCreatedAt(loan.getCreatedAt());
        dto.setUpdatedAt(loan.getUpdatedAt());
        
        return dto;
    }

    public Loan toEntity(CreateLoanDTO dto, User user) {
        if (dto == null) return null;

        Loan loan = new Loan();
        loan.setUser(user);
        loan.setAmount(dto.getAmount());
        loan.setTenure(dto.getTenure());
        loan.setPurpose(dto.getPurpose());
        
        return loan;
    }
}
