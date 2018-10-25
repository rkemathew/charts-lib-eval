import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { ModalModule } from 'ngx-modialog';
import { MultiSelectModule } from 'primeng/multiselect';

import { AppComponent } from './app.component';
import { CsvUtilsService } from './modules/shared/services/csv-utils.service';

import { ComponentsModule } from './modules/components/components.module';
import { KfComponentsModule, KfDropdownService } from '@kf-products-core/kfhub_lib';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ChartModule,
        ModalModule,
        MultiSelectModule,
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
