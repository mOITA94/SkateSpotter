package com.skatespotter.service;

import com.skatespotter.dto.ReportDTO;
import com.skatespotter.model.Report;
import com.skatespotter.model.SkateSpot;
import com.skatespotter.model.User;
import com.skatespotter.repository.ReportRepository;
import com.skatespotter.repository.SkateSpotRepository;
import com.skatespotter.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private SkateSpotRepository spotRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ReportDTO createReport(String username, Long spotId, String reason) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SkateSpot spot = spotRepository.findById(spotId)
                .orElseThrow(() -> new RuntimeException("Spot not found"));

        Report report = new Report(reason, user, spot);

        reportRepository.save(report);

        return new ReportDTO(report);
    }

    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(ReportDTO::new)
                .collect(Collectors.toList());
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
}

