package com.personal.ExpenseTracker.services.stats;

import com.personal.ExpenseTracker.dto.GraphDTO;
import com.personal.ExpenseTracker.dto.StatsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface StatsService {
 public GraphDTO getChartDto();
 public StatsDTO getStats();
}
