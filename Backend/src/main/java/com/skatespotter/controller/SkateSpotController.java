package com.skatespotter.controller;

import com.skatespotter.model.SkateSpot;
import com.skatespotter.service.SkateSpotService;
import com.skatespotter.service.ImageUploadService;
import com.skatespotter.dto.SkateSpotDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/spots")
public class SkateSpotController {

	private final SkateSpotService skateSpotService;
	private final ImageUploadService imageUploadService;

	public SkateSpotController(SkateSpotService skateSpotService, ImageUploadService imageUploadService) {
		this.skateSpotService = skateSpotService;
		this.imageUploadService = imageUploadService;
	}

	@GetMapping
	public List<SkateSpotDTO> getAllSpots() {
		return skateSpotService.findAll().stream().map(SkateSpotDTO::new).toList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<SkateSpotDTO> getSpotById(@PathVariable Long id) {
		return skateSpotService.findById(id).map(spot -> ResponseEntity.ok(new SkateSpotDTO(spot)))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createSpot(@RequestParam("image") MultipartFile image,
			@RequestParam("username") String username, @RequestParam("name") String name,
			@RequestParam("description") String description, @RequestParam("location") String location,
			@RequestParam("surface") String surface, @RequestParam("difficulty") String difficulty) {
		try {
			String imageUrl = imageUploadService.uploadImage(image);

			SkateSpot spot = new SkateSpot();
			spot.setName(name);
			spot.setDescription(description);
			spot.setLocation(location);
			spot.setSurface(surface);
			spot.setDifficulty(difficulty);
			spot.setImageUrl(imageUrl);
			spot.setCreatedAt(LocalDateTime.now());

			SkateSpot created = skateSpotService.save(spot, username);
			return ResponseEntity.ok(new SkateSpotDTO(created));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image or saving spot");
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSpot(@PathVariable Long id, @RequestParam String username) {
		try {
			skateSpotService.delete(id, username);
			return ResponseEntity.ok("Spot deleted");
		} catch (SecurityException e) {
			return ResponseEntity.status(403).body("Permission denied");
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateSpot(@PathVariable Long id, @RequestBody SkateSpot updatedSpot,
			@RequestParam String username) {
		try {
			SkateSpot spot = skateSpotService.update(id, updatedSpot, username);
			return ResponseEntity.ok(new SkateSpotDTO(spot));
		} catch (SecurityException e) {
			return ResponseEntity.status(403).body("Permission denied");
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/by-user/{username}")
	public ResponseEntity<List<SkateSpot>> getSpotsByUser(@PathVariable String username) {
		return ResponseEntity.ok(skateSpotService.findByUser(username));
	}

	@PutMapping("/{id}/rate")
	public ResponseEntity<SkateSpotDTO> rateSpot(@PathVariable Long id, @RequestParam double rating) {
		try {
			SkateSpot updated = skateSpotService.addRating(id, rating);
			return ResponseEntity.ok(new SkateSpotDTO(updated));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(null);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/filter")
	public ResponseEntity<List<SkateSpotDTO>> filterSpots(@RequestParam(required = false) String difficulty,
			@RequestParam(required = false) String surface, @RequestParam(required = false) String location) {

		List<SkateSpotDTO> filtered = skateSpotService.findAll().stream()

				.filter(s -> difficulty == null
						|| (s.getDifficulty() != null && s.getDifficulty().equalsIgnoreCase(difficulty)))
				.filter(s -> surface == null || (s.getSurface() != null && s.getSurface().equalsIgnoreCase(surface)))
				.filter(s -> location == null
						|| (s.getLocation() != null && s.getLocation().toLowerCase().contains(location.toLowerCase())))

				.map(SkateSpotDTO::new).toList();

		return ResponseEntity.ok(filtered);
	}

	/*
	 * @PostMapping public ResponseEntity<SkateSpotDTO> createSpot(@RequestBody
	 * SkateSpotRequest request) { SkateSpot spot = request.getSpot();
	 * spot.setCreatedAt(LocalDateTime.now()); SkateSpot created =
	 * skateSpotService.save(request.getSpot(), request.getUsername()); return
	 * ResponseEntity.ok(new SkateSpotDTO(created)); }
	 */
	
	/*
	 * public static class SkateSpotRequest { private SkateSpot spot; private String
	 * username;
	 * 
	 * public SkateSpot getSpot() { return spot; } public void setSpot(SkateSpot
	 * spot) { this.spot = spot; } public String getUsername() { return username; }
	 * public void setUsername(String username) { this.username = username; } }
	 */
	

}