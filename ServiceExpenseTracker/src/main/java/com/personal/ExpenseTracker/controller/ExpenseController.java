package com.personal.ExpenseTracker.controller;

import com.personal.ExpenseTracker.Repository.ExpenseRepository;
import com.personal.ExpenseTracker.dto.ExpenseDTO;
import com.personal.ExpenseTracker.entity.Expense;
import com.personal.ExpenseTracker.services.expense.ExpenseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" , allowedHeaders = "*")

public class ExpenseController {
    private final ExpenseService expenseService;

    //     public ExpenseController(ExpenseService expenseService){
//          this.expenseService = expenseService;
//     }
    @PostMapping
    public ResponseEntity<?> postExpense(@RequestBody ExpenseDTO dto) {
        Expense createdExpense = expenseService.postExpense(dto);
        if (createdExpense != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(expenseService.getExpenseById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving the expense.");
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody ExpenseDTO dto) {
        try {
            return ResponseEntity.ok(expenseService.updateExpense(id, dto));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the expense.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id){
          try {
              expenseService.deleteExpense(id);
              return ResponseEntity.ok(null);
          } catch (EntityNotFoundException ex) {
              return ResponseEntity.status(HttpStatus.NOT_FOUND)
                      .body(ex.getMessage());
          } catch (Exception ex) {
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .body("An error occurred while deleting the expense.");
          }
    }
}