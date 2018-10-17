import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { CsvUtilsService } from './modules/shared/services/csv-utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'app';
    highCharts = Highcharts;
    series = [{
        name: 'Below Expectation',
        data: [64, 70, 76, 82, 82, 82, 87]
    }, {
        name: 'Meets Expectation',
        data: [60, 66, 71, 83, 83, 83, 87]
    }, {
        name: 'Above Expectation',
        data: [67, 70, 77, 84, 84, 84, 87]
    }];

    chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Pay for Performance Over Time'
        },
        // subtitle: {
        //     text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        // },
        xAxis: {
            categories: [1, 2, 3, 4, 5, 6, 7],
            title: {
                text: 'Years Employed'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Compensation (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                formatter: (ref) => ref.value + 'M'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: this.series
    };

    constructor(
        private csvUtils: CsvUtilsService,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        // const csv = 
        //     'BINS, TICKS_BELOW, TICKS_MEETS, TICKS_ABOVE\n' +
        //     '1, 64, 60, 67\n' +
        //     '2, 70, 66, 70\n' +
        //     '3, 76, 71, 77\n' +
        //     '4, 82, 83, 84\n' +
        //     '5, 82, 83, 84\n' +
        //     '6, 82, 83, 84\n' +
        //     '7, 87, 87, 87';

        this.http.get('assets/kf-payh-poc-charts-sample-data.csv', { responseType: 'text' }).subscribe((data) => {
            const csv = data;
            const csvAsJSON = this.csvUtils.csvToJSON(csv);
            console.log('csvAsJSON', csvAsJSON);
    
            setTimeout(() => {
                this.highCharts.charts[0].series[0].setData([44, 50, 32, 60, 64, 15, 34]);
                this.highCharts.charts[0].series[1].setData([37, 26, 79, 44, 39, 92, 67]);
                this.highCharts.charts[0].series[2].setData([70, 27, 33, 90, 65, 41, 73]);
            }, 5000);
        });
    }
}
