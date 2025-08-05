package com.personal.ExpenseTracker.dto;

import com.personal.ExpenseTracker.entity.Expense;
import com.personal.ExpenseTracker.entity.Income;
import lombok.Data;

import java.util.List;

@Data
public class GraphDTO {
    private List<Expense> expenseList;

    private List<Income> incomeList;


}
