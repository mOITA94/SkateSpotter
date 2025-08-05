package com.skatespotter.controller;

import com.skatespotter.model.SkateSpot;
import com.skatespotter.service.SkateSpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private SkateSpotService skateSpotService;

    @PostMapping("/{spotId}")
    public ResponseEntity<SkateSpot> rateSpot(@PathVariable Long spotId, @RequestParam int value, Authentication auth) {
        if (value < 1 || value > 5) {
            return ResponseEntity.badRequest().build();
        }

        SkateSpot updated = skateSpotService.addRating(spotId, value);
        return ResponseEntity.ok(updated);
    }
}
