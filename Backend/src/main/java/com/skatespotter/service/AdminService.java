package com.skatespotter.service;

import com.skatespotter.model.Admin;
import com.skatespotter.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public boolean isEmailTaken(String email) {
		return adminRepository.findByEmail(email).isPresent();
	}

	public boolean isUsernameTaken(String username) {
		return adminRepository.findByUsername(username).isPresent();
	}

	public Admin createAdmin(Admin admin) {
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		return adminRepository.save(admin);
	}

	public void saveAdmin(Admin admin) {
		adminRepository.save(admin);
	}

	public Optional<Admin> findByUsername(String username) {
		return adminRepository.findByUsername(username);
	}

	public Optional<Admin> findByEmail(String email) {
		return adminRepository.findByEmail(email);
	}
}
