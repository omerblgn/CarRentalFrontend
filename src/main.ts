/// <reference types="@angular/localize" />

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeTr, 'tr');
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
