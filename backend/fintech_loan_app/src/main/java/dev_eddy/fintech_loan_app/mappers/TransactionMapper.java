package dev_eddy.fintech_loan_app.mappers;

import dev_eddy.fintech_loan_app.dtos.CreateTransactionDTO;
import dev_eddy.fintech_loan_app.dtos.TransactionDTO;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import dev_eddy.fintech_loan_app.entity.Transaction;
import dev_eddy.fintech_loan_app.entity.Loan;
import dev_eddy.fintech_loan_app.entity.User;



@Component
public class TransactionMapper {

    public TransactionDTO toDTO(Transaction transaction) {
        if (transaction == null) {
            return null;
        }

        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setUserId(transaction.getUser().getId());
        dto.setLoanId(transaction.getLoan().getId());
        dto.setTransactionType(transaction.getTransactionType());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setStatus(transaction.getStatus());
        dto.setCreatedAt(transaction.getCreatedAt());
        dto.setUpdatedAt(transaction.getUpdatedAt());

        return dto;
    }

    public Transaction toEntity(CreateTransactionDTO dto, User user, Loan loan) {
        if (dto == null) {
            return null;
        }

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setLoan(loan);
        transaction.setTransactionType(dto.getTransactionType());
        transaction.setAmount(dto.getAmount());
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("PENDING");

        return transaction;
    }
}
