import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { ModalModule } from 'ngx-modialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';

import { HighChartsComponent } from './high-charts/high-charts.component';

import { KfComponentsModule, KfDropdownService } from '@kf-products-core/kfhub_lib';
import { CsvUtilsService } from '../services/csv-utils.service';
import { GoogleChartsComponent } from './google-charts/google-charts.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { HighCharts1Component } from './high-charts1/high-charts1.component';
import { ChartFrameworkComponent } from './chart-framework/chart-framework.component';
@NgModule({
    declarations: [
        ChartFrameworkComponent,
        HighChartsComponent,
        HighCharts1Component,
        GoogleChartsComponent,
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ChartModule,
        Ng2GoogleChartsModule,
        ModalModule,
        MultiSelectModule,
        TabViewModule,
        KfComponentsModule,
    ],
    exports: [
        ChartFrameworkComponent,
        HighChartsComponent,
        HighCharts1Component,
        GoogleChartsComponent,
    ],
    providers: [
        CsvUtilsService,
        KfDropdownService,
    ],
})
export class ComponentsModule { }
