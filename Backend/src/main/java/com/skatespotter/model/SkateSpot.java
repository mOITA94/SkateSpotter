package com.skatespotter.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
public class SkateSpot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Name is required")
	@Size(max = 100, message = "Name must be less than 100 characters")
	private String name;

	@NotBlank(message = "Location is required")
	@Size(max = 150, message = "Location must be less than 150 characters")
	private String location;

	@Size(max = 500, message = "Location URL must be less than 500 characters")
	@Pattern(regexp = "^(https?://)?(www\\.)?google\\.com/maps/.*$", message = "Location URL must be a valid Google Maps link")
	private String locationUrl;

	@NotBlank(message = "Surface is required")
	private String surface;

	@NotBlank(message = "Difficulty is required")
	private String difficulty;
	
	@Column(length = 500)
	private String imageUrl;

	@Size(max = 500, message = "Description must be less than 500 characters")
	private String description;

	@DecimalMin(value = "0.0", inclusive = true)
	@DecimalMax(value = "5.0", inclusive = true)
	private double rating;

	@Min(0)
	private int ratingCount;

	private LocalDateTime createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User createdBy;

	public SkateSpot() {
	}

	public SkateSpot(String name, String location, String locationUrl, String surface, String difficulty, String description,
			User createdBy) {
		this.name = name;
		this.location = location;
		this.surface = surface;
		this.difficulty = difficulty;
		this.description = description;
		this.locationUrl = locationUrl;
		this.rating = 0.0;
		this.ratingCount = 0;
		this.createdAt = LocalDateTime.now();
		this.createdBy = createdBy;
	}

	// Getters and setters...

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public String getLocationUrl() {
		return locationUrl;
	}

	public void setLocationUrl(String locationUrl) {
		this.locationUrl = locationUrl;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getSurface() {
		return surface;
	}

	public void setSurface(String surface) {
		this.surface = surface;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public int getRatingCount() {
		return ratingCount;
	}

	public void setRatingCount(int ratingCount) {
		this.ratingCount = ratingCount;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}
	
	public String getImageUrl() {
	    return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
	    this.imageUrl = imageUrl;
	}
}
