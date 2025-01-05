package dev_eddy.fintech_loan_app.exceptions;

public class RoleAlreadyExistsException extends RuntimeException {
    public RoleAlreadyExistsException(String message) {
        super(message);
    }
}

