 package dev_eddy.fintech_loan_app.controllers;

import dev_eddy.fintech_loan_app.dtos.TransactionDTO;
import dev_eddy.fintech_loan_app.dtos.UserDTO;
import dev_eddy.fintech_loan_app.dtos.CreateTransactionDTO;
import dev_eddy.fintech_loan_app.dtos.LoanDTO;
import dev_eddy.fintech_loan_app.services.TransactionService;

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

    // Create a transaction
    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(
            @Valid @RequestBody CreateTransactionDTO createTransactionDTO) {
        TransactionDTO transaction = transactionService.createTransaction(createTransactionDTO);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    // Get all transactions
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAllUserTransactions() {
        List<TransactionDTO> trasactions = transactionService.getAllUserTransactions();
        return ResponseEntity.ok(trasactions);
    }

     // Getting a users transaction details
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id) {
        TransactionDTO transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(transaction);
    }

    // Get a users transaction details by user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionDTO>> getUserTransactions(@PathVariable Long userId) {
        List<TransactionDTO> transactions = transactionService.getUserTransactions(userId);
        return ResponseEntity.ok(transactions);
    }

    // Updating a users transaction details
    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<TransactionDTO> updateTransactionStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        TransactionDTO transaction = transactionService.updateTransactionStatus(id, status);
        return ResponseEntity.ok(transaction);
    }

    // Delete a user transaction
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }


}