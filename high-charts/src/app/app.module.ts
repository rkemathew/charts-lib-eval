import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { CsvUtilsService } from './modules/shared/services/csv-utils.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ChartModule,
    ],
    providers: [
        CsvUtilsService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
