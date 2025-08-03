package com.skatespotter.service;

import com.skatespotter.model.SkateSpot;
import com.skatespotter.model.User;
import com.skatespotter.repository.SkateSpotRepository;
import com.skatespotter.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class SkateSpotService {

	@Autowired
	private SkateSpotRepository skateSpotRepository;

	@Autowired
	private UserRepository userRepository;

	public List<SkateSpot> findAll() {
		return skateSpotRepository.findAll();
	}

	public Optional<SkateSpot> findById(Long id) {
		return skateSpotRepository.findById(id);
	}

	@Transactional
	public SkateSpot save(SkateSpot skateSpot, String creatorUsername) {
		User user = userRepository.findByUsername(creatorUsername)
				.orElseThrow(() -> new RuntimeException("User not found: " + creatorUsername));
		skateSpot.setCreatedBy(user);
		// Força valores seguros na criação
	    skateSpot.setRating(0.0);
	    skateSpot.setRatingCount(0);
		return skateSpotRepository.save(skateSpot);
	}

	@Transactional
	public void delete(Long id, String username) {
		Optional<SkateSpot> optional = skateSpotRepository.findById(id);
		if (optional.isPresent()) {
			SkateSpot spot = optional.get();
			if (spot.getCreatedBy().getUsername().equals(username)) {
				skateSpotRepository.delete(spot);
			} else {
				throw new SecurityException("You do not have permission to delete this spot.");
			}
		}
	}

	public List<SkateSpot> findByUser(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("User not found: " + username));
		return skateSpotRepository.findByCreatedBy(user);
	}

	@Transactional
	public SkateSpot update(Long id, SkateSpot updatedSpot, String username) {
		SkateSpot existing = skateSpotRepository.findById(id).orElseThrow(() -> new RuntimeException("Spot not found"));

		// Verifica se o usuário autenticado é o criador
		if (!existing.getCreatedBy().getUsername().equals(username)) {
			throw new SecurityException("User not authorized to update this spot");
		}

		// Atualiza apenas os campos permitidos
		existing.setName(updatedSpot.getName());
		existing.setLocation(updatedSpot.getLocation());
		existing.setSurface(updatedSpot.getSurface());
		existing.setDifficulty(updatedSpot.getDifficulty());
		existing.setDescription(updatedSpot.getDescription());

		// Não altera createdBy, rating, ratingCount ou createdAt aqui

		return skateSpotRepository.save(existing);
	}

	@Transactional
	public SkateSpot addRating(Long spotId, double rating) {
		if (rating < 0.0 || rating > 5.0) {
			throw new IllegalArgumentException("Rating must be between 0.0 and 5.0");
		}

		SkateSpot spot = skateSpotRepository.findById(spotId).orElseThrow(() -> new RuntimeException("Spot not found"));

		// Atualiza a média ponderada
		double totalRating = spot.getRating() * spot.getRatingCount();
		totalRating += rating;
		spot.setRatingCount(spot.getRatingCount() + 1);
		spot.setRating(totalRating / spot.getRatingCount());

		return skateSpotRepository.save(spot);
	}
	
	public List<SkateSpot> filterSpots(String difficulty, String surface, String location) {
	    return skateSpotRepository.findAll().stream()
	        .filter(s -> difficulty == null || s.getDifficulty().equalsIgnoreCase(difficulty))
	        .filter(s -> surface == null || s.getSurface().equalsIgnoreCase(surface))
	        .filter(s -> location == null || s.getLocation().toLowerCase().contains(location.toLowerCase()))
	        .toList();
	}
}
