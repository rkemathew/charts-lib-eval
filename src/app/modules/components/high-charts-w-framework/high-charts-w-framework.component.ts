import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { CsvUtilsService } from '../../services/csv-utils.service';
import { ChartHeader } from '../../models/ChartHeader.model';
import { ChartFilter } from '../../models/ChartFilter.model';

@Component({
    selector: 'app-high-charts-w-framework',
    templateUrl: './high-charts-w-framework.component.html',
    styleUrls: ['./high-charts-w-framework.component.less'],
})
export class HighChartsWithFrameworkComponent implements OnInit {

    geographyFilter: SelectItem[] = [];
    compensationElementFilter: SelectItem[] = [];
    jobFunctionFilter: SelectItem[] = [];
    jobFamilyFilter: SelectItem[] = [];

    chartHeader: ChartHeader = null;
    chartFilters: ChartFilter[] = null;

    chart: Chart = null;
    chartOptions = null;

    rawData = [
        [8, 2900000],
        [9, 2000000],
        [10, 3700000],
        [11, 3100000],
        [12, 1800000],
        [13, 1100000],
        [14, 2000000],
        [15, 1300000],
        [16, 1600000],
        [17, 700000],
        [18, 1800000],
        [19, 1600000],
        [20, 800000],
        [21, 900000]
    ];
    chartData = null;

    mapping = [0, 34, 40, 47, 54, 63, 73, 85, 98, 114, 135, 161, 192, 228, 269, 314, 371, 439, 519, 614,
                735, 880, 1056, 1261, 1508, 1801, 2141, 2551, 3021, 3581, 4251, 5061, 6021, 7161, 8321,
                9641, 11181, 12981, 15081];

    constructor(
        private http: HttpClient,
        private csvUtils: CsvUtilsService,
    ) {}

    ngOnInit() {
        // Take the existing data, and map the grade to it's scaled value via the mapping array provided
        // The new x value will be mapping[x]
        // I put the resulting data in a new array so as not to overwrite the raw data, but there is probably a better approach,
        //   keeping in mind the filtering that will need to occur
        this.chartData = this.rawData.map((element) => {
            return [this.mapping[element[0]], element[1]];
        });
        this.updateChartContent();
    }

    updateChartHeader() {
        this.chartHeader = {
            category: 'Pay for Performance',
            title: 'Pay for Performance Over Time - High Charts (implemented with Framework)',
            description: `
                This report summarized how your pay for performance data relates to both tenure and job level within your organization.
                Analysis of this data can help you see if you are differentiating pay based upon performance and the potential impact tenure
                has on overall pay.
            `
        };
    }

    updateChartFilters() {
    }

    updateChartContent() {
        this.chartOptions = this.getChartOptions(0, 0);
        this.chart = new Chart(this.chartOptions);
    }

    getChartOptions(categories, series) {
        return {
            chart: {
                type: 'column',
                plotBackgroundColor: '#fafafa',
                width: 796,
                height: 356
            },
            title: {
                text: 'Competitiveness Overview'
            },
            yAxis: {
                title: {
                    text: 'Headcount',
                    offset: 54,
                    style: {
                        'font-size': '12px',
                        'color': '#919191'
                    }
                },
                labels: {
                    x: -13,
                    style: {
                        'font-size': '12px',
                        'font-weight': '600',
                        'color': '#000000'
                    }
                },
                tickInterval: 1000000
            },
            xAxis: {
                title: {
                    text: 'Grade',
                    offset: 41.5,
                    style: {
                        'font-size': '12px',
                        'line-height': '1.5',
                        'letter-spacing': '0.2px',
                        'color': '#919191'
                    }
                },
                labels: {
                    style: {
                        'font-size': '12px',
                        'font-weight': '600',
                        'color': '#000000'
                    },
                    formatter: (label) => {
                        // This will revert the mapping so that the x axis labels will be the grade assigned,
                        //   instead of the scaled values
                        return this.mapping.indexOf(label.value);
                    },
                },
                // only show x axis ticks at the grade values
                tickPositions: this.mapping,
            },
            series: [{
                data: this.chartData,
                color: '#06c0b3',
                maxPointWidth: 8,
            }]
        };
    }

    labelFormatter (value) {
        return this.mapping.indexOf(value);
    }

    isInFilter(record) {
    }

    onChartFiltersChange(event) {
    }

}
