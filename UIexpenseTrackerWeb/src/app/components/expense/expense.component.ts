import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzCardComponent } from "ng-zorro-antd/card";
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { error, timeStamp } from 'node:console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule,NzCardComponent, DemoNgZorroAntdModule, ReactiveFormsModule , NzSelectModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
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
  constructor(private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router
  ) {}
       ngOnInit() {
         this.getAllExpenses();
         this.expenseForm = this.fb.group({
           title: [null , Validators.required],
           amount: [null , Validators.required],
           date: [null , Validators.required],
           category: [null , Validators.required],
           description: [null , Validators.required]
       })
  }

     submitForm() {
       this.expenseService.postExpense(this.expenseForm.value).subscribe(res=>{
        this.message.success("Expense submitted successfully", { nzDuration: 5000 });
        this.getAllExpenses();
     }, error => {
        this.message.error("Error while submitting expense", { nzDuration: 5000 });
     })
}

      getAllExpenses(){
           this.expenseService.getAllExpenses().subscribe(res => {
               this.expenses = res;
               console.log(this.expenses);
           })
              }

        updateExpense(id:number){
              this.router.navigateByUrl(`/expense/${id}/edit`);
        }

        deleteExpense(id:number){
            this.expenseService.deleteExpense(id).subscribe(res => {
                this.message.success("Expense deleted successfully", { nzDuration: 5000});
                this.getAllExpenses();
            }, error=>{
                this.message.error("Errr while deleting expense", { nzDuration: 5000});
            })
        }

}
