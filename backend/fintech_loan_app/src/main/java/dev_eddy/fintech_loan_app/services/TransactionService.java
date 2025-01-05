package dev_eddy.fintech_loan_app.services;

import dev_eddy.fintech_loan_app.dtos.TransactionDTO;
import dev_eddy.fintech_loan_app.dtos.CreateTransactionDTO;
import dev_eddy.fintech_loan_app.entity.User;
import dev_eddy.fintech_loan_app.entity.Loan;
import dev_eddy.fintech_loan_app.entity.Transaction;
import dev_eddy.fintech_loan_app.exceptions.ResourceNotFoundException;
import dev_eddy.fintech_loan_app.repository.UserRepository;
import dev_eddy.fintech_loan_app.repository.TransactionRepository;
import dev_eddy.fintech_loan_app.repository.LoanRepository;
import dev_eddy.fintech_loan_app.mappers.TransactionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final LoanRepository loanRepository;
    private final TransactionMapper transactionMapper;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository,
            UserRepository userRepository,
            LoanRepository loanRepository,
            TransactionMapper transactionMapper) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.loanRepository = loanRepository;
        this.transactionMapper = transactionMapper;
    }

    public TransactionDTO createTransaction(CreateTransactionDTO createTransactionDTO) {
        User user = userRepository.findById(createTransactionDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Loan loan = loanRepository.findById(createTransactionDTO.getLoanId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        Transaction transaction = transactionMapper.toEntity(createTransactionDTO, user, loan);
        Transaction savedTransaction = transactionRepository.save(transaction);
        return transactionMapper.toDTO(savedTransaction);
    }

    public List<TransactionDTO> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId).stream()
                .map(transactionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<TransactionDTO> getLoanTransactions(Long loanId) {
        return transactionRepository.findByLoanId(loanId).stream()
                .map(transactionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO updateTransactionStatus(Long id, String status) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        transaction.setStatus(status);
        Transaction updatedTransaction = transactionRepository.save(transaction);
        return transactionMapper.toDTO(updatedTransaction);
    }
}
