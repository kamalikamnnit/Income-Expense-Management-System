package com.personal.ExpenseTracker.services.expense;

import com.personal.ExpenseTracker.dto.ExpenseDTO;
import com.personal.ExpenseTracker.entity.Expense;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpenseService {
    Expense postExpense(ExpenseDTO expenseDto);
    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);
    Expense updateExpense(Long id, ExpenseDTO expenseDto);

    void deleteExpense(Long id);
}
