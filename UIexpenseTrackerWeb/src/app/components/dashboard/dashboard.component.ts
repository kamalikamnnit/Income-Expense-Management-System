// import { StatsService } from '../../services/stats/stats.service';
// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { NzCardComponent } from "ng-zorro-antd/card";
// import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
// import Chart from 'chart.js/auto'
// import { CategoryScale } from 'chart.js/auto';

// Chart.register(CategoryScale);

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [DemoNgZorroAntdModule,CommonModule,ReactiveFormsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss'
// })
// export class DashboardComponent {



//        gridStyle = {
//          width: '25%',
//          textAlign: 'center'
//        };


//         stats: any;
//         expenses: any;
//         incomes: any;

//        @ViewChild('incomeLineChartRef') private incomeLineChartRef:ElementRef;
//        @ViewChild('expenseLineChartRef') private expenseLineChartRef:ElementRef;

//     constructor(private statsService: StatsService){
//        this.getStats();
//        this.getChartData();
//     }

//      createLineChart(){
//        const incomectx = this.incomeLineChartRef.nativeElement.getContext('2d');

//         new Chart(incomectx, {
//     type: 'line',
//     data: {
//       labels: this.incomes.map(income => income.date),
//       datasets: [{
//         label: 'Income',
//         data: this.incomes.map(income => income.amount),
//         borderWidth: 1,
//         backgroundColor: 'rgb(80, 200, 120)',
//          borderColor: 'rgb(0,100,0)',
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

//    const expensectx = this.expenseLineChartRef.nativeElement.getContext('2d');

//         new Chart(expensectx, {
//     type: 'line',
//     data: {
//       labels: this.expenses.map(expense => expense.date),
//       datasets: [{
//         label: 'Expense',
//         data: this.expenses.map(income => income.amount),
//         borderWidth: 1,
//         backgroundColor: 'rgb(255,0,0)',
//          borderColor: 'rgb(255,0,0)',
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });


//      }

//         getStats() {
//            this.statsService.getStats().subscribe(res => {
//               console.log(res);
//               this.stats = res;
//            })
//         }

//         getChartData() {
//            this.statsService.getChart().subscribe(res =>{
//              if(res.expenseList != null && res.incomeList != null){
//                 this.incomes = res.incomeList;
//                 this.expenses = res.expenseList;

//                 console.log(res);
//              }
//            })
//         }

//     }

import { StatsService } from '../../services/stats/stats.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DemoNgZorroAntdModule } from "../../DemoNgZorroAntdModule";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoNgZorroAntdModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  stats: any;
  expenses: any = [];
  incomes: any = [];
  incomeChart: any;
  expenseChart: any;

  @ViewChild('incomeLineChartRef') private incomeLineChartRef!: ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef!: ElementRef;

  constructor(private statsService: StatsService) {}

  ngAfterViewInit() {
    this.getStats();
    this.getChartData();
  }

  ngOnDestroy() {
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }
  }

  createCharts() {
    if (!this.incomeLineChartRef?.nativeElement || !this.expenseLineChartRef?.nativeElement) {
      return;
    }

    // Destroy previous charts if they exist
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }

    // Create Income Chart
    if (this.incomes?.length) {
      const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
      this.incomeChart = new Chart(incomeCtx, {
        type: 'line',
        data: {
          labels: this.incomes.map(income => new Date(income.date).toLocaleDateString()),
          datasets: [{
            label: 'Income',
            data: this.incomes.map(income => income.amount),
            borderWidth: 2,
            backgroundColor: 'rgba(80, 200, 120, 0.2)',
            borderColor: 'rgba(0, 100, 0, 1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value;
                }
              }
            }
          }
        }
      });
    }

    // Create Expense Chart
    if (this.expenses?.length) {
      const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
      this.expenseChart = new Chart(expenseCtx, {
        type: 'line',
        data: {
          labels: this.expenses.map(expense => new Date(expense.date).toLocaleDateString()),
          datasets: [{
            label: 'Expense',
            data: this.expenses.map(expense => expense.amount),
            borderWidth: 2,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 0, 0, 1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value;
                }
              }
            }
          }
        }
      });
    }
  }

  getStats() {
    this.statsService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe(res => {
      if (res.expenseList && res.incomeList) {
        this.incomes = res.incomeList;
        this.expenses = res.expenseList;
        this.createCharts();
      }
    });
  }
}