import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ModalModule } from 'ngx-modialog';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';

import { AppComponent } from './app.component';
import { CsvUtilsService } from './modules/services/csv-utils.service';

import { ComponentsModule } from './modules/components/components.module';
import { KfComponentsModule, KfDropdownService } from '@kf-products-core/kfhub_lib';
import { AppRouterModule } from './app-router.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ChartModule,
        Ng2GoogleChartsModule,
        ModalModule,
        ButtonModule,
        MultiSelectModule,
        TabViewModule,
        ToolbarModule,
        AppRouterModule,
        KfComponentsModule,
        ComponentsModule,
    ],
    providers: [
        CsvUtilsService,
        KfDropdownService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
