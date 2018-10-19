import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { ModalModule } from 'ngx-modialog';
import { ListboxModule } from 'primeng/listbox';

import { AppComponent } from './app.component';
import { CsvUtilsService } from './modules/shared/services/csv-utils.service';

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
        ListboxModule,
        KfComponentsModule,
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
