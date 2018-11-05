import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ModalModule } from 'ngx-modialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';
import { CsvUtilsService } from './modules/services/csv-utils.service';

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
        Ng2GoogleChartsModule,
        ModalModule,
        MultiSelectModule,
        TabViewModule,
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
