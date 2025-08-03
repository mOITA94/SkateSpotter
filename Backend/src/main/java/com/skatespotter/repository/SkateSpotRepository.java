package com.skatespotter.repository;

import com.skatespotter.model.SkateSpot;
import com.skatespotter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkateSpotRepository extends JpaRepository<SkateSpot, Long> {
	List<SkateSpot> findByCreatedBy(User createdBy);
}
