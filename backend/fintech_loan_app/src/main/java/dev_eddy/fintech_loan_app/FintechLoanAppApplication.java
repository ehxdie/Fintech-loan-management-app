package dev_eddy.fintech_loan_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;



@SpringBootApplication
@EntityScan("dev_eddy.fintech_loan_app.entity")
@EnableJpaRepositories("dev_eddy.fintech_loan_app.repository")
public class FintechLoanAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FintechLoanAppApplication.class, args);
	}

}
