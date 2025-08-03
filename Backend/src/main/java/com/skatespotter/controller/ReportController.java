package com.skatespotter.controller;

import com.skatespotter.dto.ReportDTO;
import com.skatespotter.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Usuário logado reporta um spot
    @PostMapping
    public ResponseEntity<ReportDTO> create(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        Long spotId = Long.valueOf(body.get("spotId"));
        String reason = body.get("reason");

        return ResponseEntity.ok(reportService.createReport(username, spotId, reason));
    }

    // Admins visualizam todos os reports
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getAll() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    // Admins excluem um report
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.ok("Report deleted");
    }
}
