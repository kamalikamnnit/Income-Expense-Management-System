package com.personal.ExpenseTracker.controller;

import com.personal.ExpenseTracker.dto.IncomeDTO;
import com.personal.ExpenseTracker.entity.Income;
import com.personal.ExpenseTracker.services.income.IncomeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/income")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" , allowedHeaders = "*")
public class IncomeController {
       private final IncomeService incomeService;

       @PostMapping
     public ResponseEntity<?> postIncome(@RequestBody IncomeDTO dto){
             Income createdIncome = incomeService.postIncome(dto);
             if(createdIncome != null) {
                 return ResponseEntity.status(HttpStatus.CREATED).body(createdIncome);
             } else {
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
             }
       }

      @GetMapping("/all")
    public ResponseEntity<?> getAllIncomes() {
        return ResponseEntity.ok(incomeService.getAllIncomes());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateIncome(@PathVariable Long id,  @RequestBody IncomeDTO dto){
             try{
                  return ResponseEntity.ok(incomeService.updateIncome(id, dto));
             } catch (EntityNotFoundException ex) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                         .body(ex.getMessage());
             } catch (Exception ex) {
                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                         .body("An error occurred while updating the expense.");
             }
    }

     @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(incomeService.getIncomeById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while retrieving the income.");
        }
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<?> deleteIncome(@PathVariable Long id) {
            try{
                 incomeService.deleteIncome(id);
                 return ResponseEntity.ok(null);
            } catch (EntityNotFoundException ex) {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                         .body(ex.getMessage());
            } catch (Exception ex) {
                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                         .body("An error occurred while deleting the income.");
            }
    }
}
