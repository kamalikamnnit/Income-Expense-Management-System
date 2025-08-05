import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzCardComponent } from "ng-zorro-antd/card";
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { error, timeStamp } from 'node:console';
import { Router , RouterLink} from '@angular/router';
import { IncomeService } from '../../services/income/income.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CommonModule, DemoNgZorroAntdModule , ReactiveFormsModule , RouterLink] ,
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
      incomeForm!: FormGroup;
      listofCategory: any[] = ["Salary" , "Freelancing" , "Investments", "Stocks" , "Bitcoin", "Bank Transfer", "Youtube" , "Other"];
      incomes : any;

      constructor(private fb: FormBuilder,
         private message: NzMessageService,
         private router: Router,
         private incomeService: IncomeService,
      ) {}

      ngOnInit(){
         this.getAllIncomes();
         this.incomeForm = this.fb.group({
           title: [null , Validators.required],
           amount: [null, [Validators.required]],
           date: [null , [Validators.required]],
           category: [null, [Validators.required]],
           description: [null, [Validators.required]],
         })
      }

      submitForm(){
      this.incomeService.postIncome(this.incomeForm.value).subscribe(res => {
            this.message.success("Income submitted successfully", { nzDuration: 5000 });
            this.getAllIncomes();
      }, error => {
       this.message.error("Error while posting income", { nzDuration: 5000 });
      })
      }

      getAllIncomes(){
         this.incomeService.getAllIncomes().subscribe(res =>{
             this.incomes = res;
         }, error =>{
            this.message.error("Error fethcing incomes", { nzDuration : 5000});
         })
      }

      deleteIncome(id: number) {
         this.incomeService.deleteIncome(id).subscribe(res=>{
           this.message.success("Income deleted successfully", { nzDuration : 5000});
           this.getAllIncomes();
         } , error=>{
            this.message.error("Error fethcing incomes", { nzDuration : 5000});
         })
      }
}
