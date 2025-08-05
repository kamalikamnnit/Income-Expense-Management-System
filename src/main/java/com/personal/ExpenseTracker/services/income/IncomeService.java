package com.personal.ExpenseTracker.services.income;

import com.personal.ExpenseTracker.dto.IncomeDTO;
import com.personal.ExpenseTracker.entity.Income;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IncomeService {
    Income postIncome(IncomeDTO incomeDTO);

    List<Income> getAllIncomes();

    Income updateIncome(Long id, IncomeDTO incomeDTO);

    IncomeDTO getIncomeById(Long id);

    void deleteIncome(Long id);
}
