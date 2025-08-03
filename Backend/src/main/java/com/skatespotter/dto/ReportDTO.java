package com.skatespotter.dto;

import com.skatespotter.model.Report;

import java.time.LocalDateTime;

public class ReportDTO {

    private Long id;
    private String reason;
    private LocalDateTime reportedAt;
    private String reportedByUsername;
    private Long spotId;
    private String spotName;

    public ReportDTO(Report report) {
        this.id = report.getId();
        this.reason = report.getReason();
        this.reportedAt = report.getReportedAt();
        
        if (report.getReportedBy() != null) {
            this.reportedByUsername = report.getReportedBy().getUsername();
        }

        if (report.getSpot() != null) {
            this.spotId = report.getSpot().getId();
            this.spotName = report.getSpot().getName();
        }
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(LocalDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

    public String getReportedByUsername() {
        return reportedByUsername;
    }

    public void setReportedByUsername(String reportedByUsername) {
        this.reportedByUsername = reportedByUsername;
    }

    public Long getSpotId() {
        return spotId;
    }

    public void setSpotId(Long spotId) {
        this.spotId = spotId;
    }

    public String getSpotName() {
        return spotName;
    }

    public void setSpotName(String spotName) {
        this.spotName = spotName;
    }
}
