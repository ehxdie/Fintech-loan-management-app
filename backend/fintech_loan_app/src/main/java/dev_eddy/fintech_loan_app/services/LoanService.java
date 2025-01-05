package dev_eddy.fintech_loan_app.services;

import dev_eddy.fintech_loan_app.dtos.CreateLoanDTO;
import dev_eddy.fintech_loan_app.dtos.LoanDTO;
import dev_eddy.fintech_loan_app.entity.Loan;
import dev_eddy.fintech_loan_app.entity.User;
import dev_eddy.fintech_loan_app.exceptions.LoanNotFoundException;
import dev_eddy.fintech_loan_app.exceptions.ResourceNotFoundException;
import dev_eddy.fintech_loan_app.mappers.LoanMapper;
import dev_eddy.fintech_loan_app.repository.LoanRepository;
import dev_eddy.fintech_loan_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LoanService {
    
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LoanMapper loanMapper;
    
    @Autowired
    public LoanService(LoanRepository loanRepository, UserRepository userRepository, LoanMapper loanMapper) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.loanMapper = loanMapper;
    }

    public LoanDTO createLoan(CreateLoanDTO createLoanDTO) {
        User user = userRepository.findById(createLoanDTO.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + createLoanDTO.getUserId()));

        Loan loan = loanMapper.toEntity(createLoanDTO, user);
        // Set default values
        loan.setStatus("PENDING");
        loan.setInterestRate(15.0); // Default interest rate
        loan.setRemainingBalance(loan.getAmount());
        
        // Calculate monthly payment
        double monthlyInterest = loan.getInterestRate() / 12 / 100;
        double monthlyPayment = (loan.getAmount() * monthlyInterest * Math.pow(1 + monthlyInterest, loan.getTenure())) 
            / (Math.pow(1 + monthlyInterest, loan.getTenure()) - 1);
        loan.setMonthlyPayment(monthlyPayment);

        Loan savedLoan = loanRepository.save(loan);
        return loanMapper.toDTO(savedLoan);
    }

    public LoanDTO getLoanById(Long id) {
        Loan loan = loanRepository.findById(id)
            .orElseThrow(() -> new LoanNotFoundException("Loan not found with id: " + id));
        return loanMapper.toDTO(loan);
    }

    public List<LoanDTO> getUserLoans(Long userId) {
        return loanRepository.findByUserId(userId).stream()
            .map(loanMapper::toDTO)
            .collect(Collectors.toList());
    }

    public LoanDTO updateLoanStatus(Long id, String status) {
        Loan loan = loanRepository.findById(id)
            .orElseThrow(() -> new LoanNotFoundException("Loan not found with id: " + id));
        
        loan.setStatus(status);
        Loan updatedLoan = loanRepository.save(loan);
        return loanMapper.toDTO(updatedLoan);
    }
}
