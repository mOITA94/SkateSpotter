package com.skatespotter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	public void sendVerificationEmail(String to, String code) {
		System.out.println(">>> Enviando código de verificação: " + code);

		String verificationLink = "http://localhost:8080/api/verify?email=" + to.replace("@", "%40") + "&code=" + code;
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("SkateSpotter - Verify your email");
		message.setText("Hello\n\n+Click <a href='"+ verificationLink +"'>this link</a> to activate your account");

		message.setFrom("skatespotterdub@gmail.com");
		mailSender.send(message);
	}

	public void sendTestEmail(String to) {
		System.out.println(">>> Dentro de sendTestEmail()");
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Test Email from SkateSpotter");
		message.setText("If you received this, the email config works!");
		message.setFrom("skatespotterdub@gmail.com");

		mailSender.send(message);
		System.out.println(">>> Email enviado para: " + to);
	}

}
