package com.skatespotter.repository;

import com.skatespotter.model.Report;
import com.skatespotter.model.SkateSpot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findBySpot(SkateSpot spot);
}