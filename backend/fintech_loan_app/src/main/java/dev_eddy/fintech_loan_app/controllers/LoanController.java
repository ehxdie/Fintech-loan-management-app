package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.CreateLoanDTO;
import dev_eddy.fintech_loan_app.dtos.LoanDTO;
import dev_eddy.fintech_loan_app.dtos.UserDTO;
import dev_eddy.fintech_loan_app.services.LoanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/loans")
public class LoanController {
    
    private final LoanService loanService;
    
    
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }
    
    // Creating a loan
    @PostMapping
    public ResponseEntity<LoanDTO> createLoan(@Valid @RequestBody CreateLoanDTO createLoanDTO) {
        LoanDTO newLoan = loanService.createLoan(createLoanDTO);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    // Getting all loans
    @GetMapping
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
        List<LoanDTO> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }
    
    // Getting a users loan details
    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoan(@PathVariable Long id) {
        LoanDTO loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }
    
    // Getting a users loan details by user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanDTO>> getUserLoans(@PathVariable Long userId) {
        List<LoanDTO> loans = loanService.getUserLoans(userId);
        return ResponseEntity.ok(loans);
    }
    
    // Updating a users loan details
    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<LoanDTO> updateLoanStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        LoanDTO updatedLoan = loanService.updateLoanStatus(id, status);
        return ResponseEntity.ok(updatedLoan);
    }

    // Delete a user transaction
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        loanService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
