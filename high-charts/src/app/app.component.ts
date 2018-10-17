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
    chartOptions = null;

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

        this.http.get('assets/kf-payh-poc-charts-sample-data.csv', { responseType: 'text' }).subscribe((csvData) => {
            const data = this.csvUtils.csvToJSON(csvData);
            // console.log('data', data);

            let minYears = Number.MAX_VALUE;
            let maxYears = Number.MIN_VALUE;
            data.forEach((record) => {
                const yearsEmployed = +record['YearsEmployed'];
                if (yearsEmployed < minYears) {
                    minYears = yearsEmployed;
                }
                
                if (yearsEmployed > maxYears) {
                    maxYears = yearsEmployed;
                }
            });

            const seriesTicksBelow = new Array(maxYears-1).fill(0, 0, maxYears-1);
            const seriesTicksMeets = new Array(maxYears-1).fill(0, 0, maxYears-1);
            const seriesTicksAbove = new Array(maxYears-1).fill(0, 0, maxYears-1);

            data.forEach((record) => {
                const yearsEmployed = +record['YearsEmployed'];
                const index = yearsEmployed - 1;
                const expectations = +record['Expectations'];
                switch (expectations) {
                case 1: seriesTicksBelow[index] = seriesTicksBelow[index] ? seriesTicksBelow[index] + 1 : 1; break;
                case 2: seriesTicksMeets[index] = seriesTicksMeets[index] ? seriesTicksMeets[index] + 1 : 1; break;
                case 3: seriesTicksAbove[index] = seriesTicksAbove[index] ? seriesTicksAbove[index] + 1 : 1; break;
                }
            });

            console.log('seriesTicksBelow', seriesTicksBelow);
            console.log('seriesTicksMeets', seriesTicksMeets);
            console.log('seriesTicksAbove', seriesTicksAbove);

            const categories = [];
            for (let i = minYears; i <= maxYears; i++) {
                categories.push(i);
            }

            console.log('categories', categories);

            const series = [
                { name: 'Below Expectation', data: seriesTicksBelow },
                { name: 'Meets Expectation', data: seriesTicksMeets },
                { name: 'Above Expectation', data: seriesTicksAbove }
            ];

            this.chartOptions = this.getChartOptions(categories, series);
        });
    }

    getChartOptions(categories, series) {
        return {
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
                categories: categories,
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
                floating: false,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: series
        };
    }
}
