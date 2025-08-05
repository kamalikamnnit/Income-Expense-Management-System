package com.personal.ExpenseTracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String Home() {
        return "Hello, Welcome to Expense Tracker!";
    }
}
