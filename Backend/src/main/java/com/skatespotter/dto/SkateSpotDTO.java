package com.skatespotter.dto;

import com.skatespotter.model.SkateSpot;

import java.time.LocalDateTime;

public class SkateSpotDTO {

    private Long id;
    private String name;
    private String location;
    private String locationUrl;
    private String surface;
    private String difficulty;
    private String description;
    private double rating;
    private int ratingCount;
    private LocalDateTime createdAt;
    private String createdByUsername; // Somente o username do criador

    public SkateSpotDTO(SkateSpot spot) {
        this.id = spot.getId();
        this.name = spot.getName();
        this.location = spot.getLocation();
        this.locationUrl = spot.getLocationUrl();
        this.surface = spot.getSurface();
        this.difficulty = spot.getDifficulty();
        this.description = spot.getDescription();
        this.rating = spot.getRating();
        this.ratingCount = spot.getRatingCount();
        this.createdAt = spot.getCreatedAt();

        // Protege contra erro de lazy-loading com proxy nulo
        if (spot.getCreatedBy() != null) {
            this.createdByUsername = spot.getCreatedBy().getUsername();
        }
    }

    // Getters e Setters 

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public String getLocationUrl() { return locationUrl; }
    public String getSurface() { return surface; }
    public String getDifficulty() { return difficulty; }
    public String getDescription() { return description; }
    public double getRating() { return rating; }
    public int getRatingCount() { return ratingCount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getCreatedByUsername() { return createdByUsername; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setLocationUrl(String locationUrl) { this.locationUrl = locationUrl; }
    public void setSurface(String surface) { this.surface = surface; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setDescription(String description) { this.description = description; }
    public void setRating(double rating) { this.rating = rating; }
    public void setRatingCount(int ratingCount) { this.ratingCount = ratingCount; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setCreatedByUsername(String createdByUsername) { this.createdByUsername = createdByUsername; }
}

