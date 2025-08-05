package com.personal.ExpenseTracker.services.income;

import com.personal.ExpenseTracker.Repository.IncomeRepository;
import com.personal.ExpenseTracker.dto.ExpenseDTO;
import com.personal.ExpenseTracker.dto.IncomeDTO;
import com.personal.ExpenseTracker.entity.Expense;
import com.personal.ExpenseTracker.entity.Income;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {
    private final IncomeRepository incomeRepository;

    @Override
    public Income postIncome(IncomeDTO incomeDTO) {
        Income income = new Income();
        return saveOrUpdateExpense(income, incomeDTO);
    }

    private Income saveOrUpdateExpense(Income income, IncomeDTO incomeDTO) {
        income.setTitle(incomeDTO.getTitle());
        income.setAmount(incomeDTO.getAmount());
        income.setDate(incomeDTO.getDate());
        income.setCategory(incomeDTO.getCategory());
        income.setDescription(incomeDTO.getDescription());

        return incomeRepository.save(income);
    }

    @Override
    public List<Income> getAllIncomes() {
        return incomeRepository.findAll().stream()
                .sorted(Comparator.comparing(Income::getDate).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Income updateIncome(Long id, IncomeDTO incomeDTO) {
         Optional<Income> optionalIncome = incomeRepository.findById(id);

         if(optionalIncome.isPresent()){
              Income existingIncome = optionalIncome.get();
              return saveOrUpdateExpense(existingIncome, incomeDTO);
         } else{
             throw new EntityNotFoundException("Income with id " + id + " not found.");
         }
    }

    @Override
      public IncomeDTO getIncomeById(Long id) {
        Optional<Income> incomeOptional = incomeRepository.findById(id);
        if(incomeOptional.isPresent()) {
            return incomeOptional.get().getIncomeDto();
        } else {
            throw new EntityNotFoundException("Income with id " + id + " not found.");
        }
    }

    @Override
    public void deleteIncome(Long id){
        Optional<Income> incomeOptional = incomeRepository.findById(id);
        if(incomeOptional.isPresent()){
             incomeRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Income with id " + id + " not found.");
        }
    }
}
