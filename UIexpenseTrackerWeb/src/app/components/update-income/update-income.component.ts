import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzCardComponent } from "ng-zorro-antd/card";
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { error, timeStamp } from 'node:console';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from '../../services/income/income.service';

@Component({
  selector: 'app-update-income',
  standalone: true,
  imports: [ CommonModule , DemoNgZorroAntdModule , ReactiveFormsModule],
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss'
})
export class UpdateIncomeComponent {
     id: number;
     incomeForm!: FormGroup;
          listofCategory: any[] = ["Salary" , "Freelancing" , "Investments", "Stocks" , "Bitcoin", "Bank Transfer", "Youtube" , "Other"];
          incomes : any;

          constructor(private fb: FormBuilder,
             private message: NzMessageService,
             private router: Router,
             private incomeService: IncomeService,
             private activatedRoute:  ActivatedRoute
          ) {
            this.id = +this.activatedRoute.snapshot.params['id'];
          }

          ngOnInit(){
             this.incomeForm = this.fb.group({
               title: [null , Validators.required],
               amount: [null, [Validators.required]],
               date: [null , [Validators.required]],
               category: [null, [Validators.required]],
               description: [null, [Validators.required]],
             });
             this.getIncomeById();
          }

          getIncomeById(){
             this.incomeService.getIncomeById(this.id).subscribe(res => {
             this.incomeForm.patchValue(res);
             }, error => {
               this.message.error("Something went wrong" , { nzDuration : 5000})
             })
          }
          submitForm() {
                this.incomeService.updateIncome(this.id , this.incomeForm.value).subscribe(res =>{
                    this.message.success("Income updated successfully" , { nzDuration : 5000});
                    this.router.navigateByUrl("/income")
                },error =>{
                    this.message.error("Error while updating income" , { nzDuration : 5000})
                })
          }

}
