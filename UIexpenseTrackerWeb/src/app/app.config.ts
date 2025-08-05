import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// Required NgZorro Modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule'; // Assuming this is a custom module that imports necessary NgZorro components
// Required icons
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  FundOutline,
  FallOutline
} from '@ant-design/icons-angular/icons';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNzI18n(en_US),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      NzLayoutModule,
      NzMenuModule,
      NzIconModule,
      DemoNgZorroAntdModule, // Assuming this is a custom module that imports necessary NgZorro components
      ReactiveFormsModule
    ),
    { provide: NZ_ICONS, useValue: [DashboardOutline, FundOutline, FallOutline] }
  ],

};
