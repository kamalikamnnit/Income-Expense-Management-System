package com.personal.ExpenseTracker.services.expense;

import com.personal.ExpenseTracker.Repository.ExpenseRepository;
import com.personal.ExpenseTracker.dto.ExpenseDTO;
import com.personal.ExpenseTracker.entity.Expense;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService{
     private final ExpenseRepository expenseRepository;

     @Override
      public Expense postExpense(ExpenseDTO expenseDto){
          Expense expense = new Expense();
          return saveOrUpdateExpense(expense, expenseDto);
      }

      private Expense saveOrUpdateExpense(Expense expense , ExpenseDTO expenseDTO) {
          expense.setTitle(expenseDTO.getTitle());
          expense.setDate(expenseDTO.getDate());
          expense.setAmount(expenseDTO.getAmount());
          expense.setCategory(expenseDTO.getCategory());
          expense.setDescription(expenseDTO.getDescription());

          return expenseRepository.save(expense);
      }


       @Override
      public List<Expense> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .sorted(Comparator.comparing(Expense::getDate ,
                        Comparator.nullsLast(Comparator.naturalOrder())).reversed())
                .collect(Collectors.toList());
    }


    @Override
    public Expense updateExpense(Long id, ExpenseDTO expenseDto) {
              Optional<Expense> optionalExpense = expenseRepository.findById(id);
              if(optionalExpense.isPresent()) {
                  Expense existingExpense = optionalExpense.get();
                  return saveOrUpdateExpense(existingExpense, expenseDto);
              } else {
                  throw new EntityNotFoundException("Expense with id " + id + " not found.");
              }
    }
        @Override
        public Expense getExpenseById(Long id) {
            Optional<Expense> expenseOptional = expenseRepository.findById(id);
            if(expenseOptional.isPresent()) {
                return expenseOptional.get();
            } else {
                throw new EntityNotFoundException("Expense with id " + id + " not found.");
            }
        }

        @Override
    public void deleteExpense(Long id){
          Optional<Expense> optionalExpense = expenseRepository.findById(id);
          if(optionalExpense.isPresent()) {
              expenseRepository.deleteById(id);
          } else {
              throw new EntityNotFoundException("Expense with id " + id + " not found.");
          }
        }

}
