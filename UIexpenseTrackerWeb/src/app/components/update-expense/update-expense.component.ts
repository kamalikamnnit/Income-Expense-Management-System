import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzCardComponent } from "ng-zorro-antd/card";
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { error, timeStamp } from 'node:console';
import { ActivatedRoute, Router } from '@angular/router';
import { NzRowDirective } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [NzRowDirective , DemoNgZorroAntdModule , ReactiveFormsModule , CommonModule],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})
export class UpdateExpenseComponent {
expenseForm!: FormGroup;

  listOfCategory: any[] = [
     "Education",
     "Groceries",
     "Health",
     "Subscriptions",
     "Takeaways",
     "Clothing",
     "Travelling",
     "Other"
  ];

  expenses : any;
  id: number;
  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = +this.activatedRoute.snapshot.params['id'];
  }
       ngOnInit() {
         this.expenseForm = this.fb.group({
           title: [null , Validators.required],
           amount: [null , Validators.required],
           date: [null , Validators.required],
           category: [null , Validators.required],
           description: [null , Validators.required]
       })
       this.getExpenseById();
  }


  getExpenseById(){
     this.expenseService.getExpenseById(this.id).subscribe(res =>{
           console.log('Api Response:',res);
           this.expenseForm.patchValue(res);
     }, error=>{
        this.message.error("Something went wrong." ,{ nzDuration : 5000});
     })
  }
     submitForm() {
         this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(res =>{
              this.message.success("Expense updated successfully" , { nzDuration:5000});
              this.router.navigateByUrl("/expense");
         } , error =>{
            this.message.error("Error while updating expense" , { nzDuration : 5000})
         })
}
}
