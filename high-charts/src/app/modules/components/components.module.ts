import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { ModalModule } from 'ngx-modialog';
import { MultiSelectModule } from 'primeng/multiselect';

import { HighChartsComponent } from './high-charts/high-charts.component';

import { KfComponentsModule, KfDropdownService } from '@kf-products-core/kfhub_lib';
import { CsvUtilsService } from '../shared/services/csv-utils.service';
@NgModule({
    declarations: [
        HighChartsComponent,
    ],

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ChartModule,
        ModalModule,
        MultiSelectModule,
        KfComponentsModule,
    ],
    exports: [
        HighChartsComponent,
    ],
    providers: [
        CsvUtilsService,
        KfDropdownService,
    ],
})
export class ComponentsModule { }
