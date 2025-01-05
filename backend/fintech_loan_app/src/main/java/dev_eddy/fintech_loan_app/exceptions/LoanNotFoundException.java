package dev_eddy.fintech_loan_app.exceptions;

public class LoanNotFoundException extends RuntimeException {
    public LoanNotFoundException(String message) {
        super(message);
    }
}


