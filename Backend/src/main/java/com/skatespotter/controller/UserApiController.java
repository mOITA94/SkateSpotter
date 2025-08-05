package com.skatespotter.controller;

import com.skatespotter.model.User;
import com.skatespotter.repository.UserRepository;
import com.skatespotter.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.skatespotter.dto.UserDTO;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserApiController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailService emailService;

	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			return "Email already in use.";
		}
		if (userRepository.findByUsername(user.getUsername()).isPresent()) {
			return "Username already in use.";
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("USER");
		user.setEnabled(false);
		user.setVerificationCode(UUID.randomUUID().toString().substring(0, 6));

		userRepository.save(user);
		emailService.sendVerificationEmail(user.getEmail(), user.getVerificationCode());

		return "User registered. Verification code sent to email. ";
	}

	@GetMapping("/verify")
	public ResponseEntity<?> verifyEmailViaLink(@RequestParam String email, @RequestParam String code) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null && code.equals(user.getVerificationCode())) {
			user.setEnabled(true);
			user.setVerificationCode(null);
			userRepository.save(user);
			return ResponseEntity.ok("Email verified successfully");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid code or email");
	}
}
