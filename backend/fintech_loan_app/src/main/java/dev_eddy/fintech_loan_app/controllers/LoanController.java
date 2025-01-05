package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.CreateLoanDTO;
import dev_eddy.fintech_loan_app.dtos.LoanDTO;
import dev_eddy.fintech_loan_app.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    
    private final LoanService loanService;
    
    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }
    
    @PostMapping
    public ResponseEntity<LoanDTO> createLoan(@Valid @RequestBody CreateLoanDTO createLoanDTO) {
        LoanDTO newLoan = loanService.createLoan(createLoanDTO);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoan(@PathVariable Long id) {
        LoanDTO loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanDTO>> getUserLoans(@PathVariable Long userId) {
        List<LoanDTO> loans = loanService.getUserLoans(userId);
        return ResponseEntity.ok(loans);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<LoanDTO> updateLoanStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        LoanDTO updatedLoan = loanService.updateLoanStatus(id, status);
        return ResponseEntity.ok(updatedLoan);
    }
}
