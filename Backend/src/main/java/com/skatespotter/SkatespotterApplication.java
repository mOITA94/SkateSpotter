package com.skatespotter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.skatespotter")
public class SkatespotterApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkatespotterApplication.class, args);
	}
}
