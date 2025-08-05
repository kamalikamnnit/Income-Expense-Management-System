package com.personal.ExpenseTracker.controller;

import com.personal.ExpenseTracker.dto.GraphDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.personal.ExpenseTracker.services.stats.StatsService;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" , allowedHeaders = "*")

public class StatsController {
 private final StatsService statsService;

  @GetMapping("/chart")
 public ResponseEntity<GraphDTO> getChartDetails() {
      return ResponseEntity.ok(statsService.getChartDto());
 }

 @GetMapping
    public ResponseEntity<?> getStats() {
      return ResponseEntity.ok(statsService.getStats());
 }
}
