import { Component } from '@angular/core';
import { RouterOutlet , RouterModule} from '@angular/router';
import { NzLayoutComponent, NzContentComponent, NzSiderComponent, NzHeaderComponent, NzFooterComponent } from "ng-zorro-antd/layout";
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NzLayoutComponent, NzContentComponent, NzSiderComponent, NzIconModule, NzHeaderComponent, NzFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expenseTrackerWeb';
}
