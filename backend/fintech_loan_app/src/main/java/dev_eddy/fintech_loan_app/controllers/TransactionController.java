 package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.TransactionDTO;
import dev_eddy.fintech_loan_app.dtos.CreateTransactionDTO;
import dev_eddy.fintech_loan_app.services.TransactionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(
            @Valid @RequestBody CreateTransactionDTO createTransactionDTO) {
        TransactionDTO transaction = transactionService.createTransaction(createTransactionDTO);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        List<TransactionDTO> transactions = transactionService.getUserTransactions(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<TransactionDTO>> getLoanTransactions(@PathVariable Long loanId) {
        List<TransactionDTO> transactions = transactionService.getLoanTransactions(loanId);
        return ResponseEntity.ok(transactions);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TransactionDTO> updateTransactionStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        TransactionDTO transaction = transactionService.updateTransactionStatus(id, status);
        return ResponseEntity.ok(transaction);
    }
}