package com.personal.ExpenseTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ExpenseDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private LocalDate date;
    private Integer amount;
}
