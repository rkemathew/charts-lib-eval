import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HighChartsComponent } from "./modules/components/high-charts/high-charts.component";
import { GoogleChartsComponent } from "./modules/components/google-charts/google-charts.component";
import { HighChartsWithFrameworkComponent } from "./modules/components/high-charts-w-framework/high-charts-w-framework.component";
import { GoogleChartsWithFrameworkComponent } from "./modules/components/google-charts-w-framework/google-charts-w-framework.component";

const appRoutes: Routes = [
    { path: 'highcharts', component: HighChartsComponent },
    { path: 'googlecharts', component: GoogleChartsComponent },
    { path: 'highchartsWFramework', component: HighChartsWithFrameworkComponent },
    { path: 'googlechartsWFramework', component: GoogleChartsWithFrameworkComponent },
    { path: '**', redirectTo: 'highchartsWFramework' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        )
    ],
})
export class AppRouterModule { }
