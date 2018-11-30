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
    data = null;

    geographyFilter: SelectItem[] = [];
    compensationElementFilter: SelectItem[] = [];
    jobFunctionFilter: SelectItem[] = [];
    jobFamilyFilter: SelectItem[] = [];

    chartHeader: ChartHeader = null;
    chartFilters: ChartFilter[] = null;

    chart: Chart = null;
    chartOptions = null;

    constructor(
        private http: HttpClient,
        private csvUtils: CsvUtilsService,
    ) {}

    ngOnInit() {
        // this.http.get('assets/kf-payh-poc-charts-sample-data.csv', { responseType: 'text' }).subscribe((csvData) => {
        //     this.data = this.csvUtils.csvToJSON(csvData);
        //     this.updateChartHeader();
        //     this.updateChartFilters();
             this.updateChartContent();
        // });
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
        // const distinctGeographies = [];
        // const distinctCompensationElements = [];
        // const distinctJobFunctions = [];
        // const distinctJobFamilies = [];

        // this.data.forEach((record) => {
        //     const geography = record['Geography'];
        //     const compensationElement = record['CompensationElement'];
        //     const jobFunction = record['JobFunction'];
        //     const jobFamily = record['JobFamily'];

        //     if (!distinctGeographies.includes(geography)) {
        //         distinctGeographies.push(geography);
        //     }

        //     if (!distinctCompensationElements.includes(compensationElement)) {
        //         distinctCompensationElements.push(compensationElement);
        //     }

        //     if (!distinctJobFunctions.includes(jobFunction)) {
        //         distinctJobFunctions.push(jobFunction);
        //     }

        //     if (!distinctJobFamilies.includes(jobFamily)) {
        //         distinctJobFamilies.push(jobFamily);
        //     }
        // });

        // distinctGeographies.forEach((geography, index) => {
        //     this.geographyFilter.push({ label: geography, value: geography });
        // });

        // distinctCompensationElements.forEach((compensationElement, index) => {
        //     this.compensationElementFilter.push({ label: compensationElement, value: compensationElement});
        // });

        // distinctJobFunctions.forEach((jobFunction, index) => {
        //     this.jobFunctionFilter.push({ label: jobFunction, value: jobFunction });
        // });

        // distinctJobFamilies.forEach((jobFamily, index) => {
        //     this.jobFamilyFilter.push({ label: jobFamily, value: jobFamily });
        // });

        // this.chartFilters = [
        //     {
        //         category: 'Main',
        //         subCategory: 'Geography',
        //         items: this.geographyFilter,
        //         selectedItems: [],
        //     },
        //     {
        //         category: 'Alternate',
        //         subCategory: 'Compensation Element',
        //         items: this.compensationElementFilter,
        //         selectedItems: [],
        //     },
        //     {
        //         category: 'Main',
        //         subCategory: 'Job Function',
        //         items: this.jobFunctionFilter,
        //         selectedItems: [],
        //     },
        //     {
        //         category: 'Alternate',
        //         subCategory: 'Job Family',
        //         items: this.jobFamilyFilter,
        //         selectedItems: [],
        //     },
        // ];
    }

    updateChartContent() {
        // let minYears = Number.MAX_VALUE;
        // let maxYears = Number.MIN_VALUE;
        // this.data.forEach((record) => {
        //     const yearsEmployed = +record['YearsEmployed'];
        //     if (yearsEmployed < minYears) {
        //         minYears = yearsEmployed;
        //     }

        //     if (yearsEmployed > maxYears) {
        //         maxYears = yearsEmployed;
        //     }
        // });

        // const seriesTicksBelow = new Array(maxYears - 1).fill(0, 0, maxYears - 1);
        // const seriesTicksMeets = new Array(maxYears - 1).fill(0, 0, maxYears - 1);
        // const seriesTicksAbove = new Array(maxYears - 1).fill(0, 0, maxYears - 1);

        // this.data.forEach((record) => {
        //     const yearsEmployed = +record['YearsEmployed'];
        //     if (this.isInFilter(record)) {
        //         const index = yearsEmployed - 1;
        //         const expectations = +record['Expectations'];
        //         switch (expectations) {
        //         case 1: seriesTicksBelow[index] = seriesTicksBelow[index] ? seriesTicksBelow[index] + 1 : 1; break;
        //         case 2: seriesTicksMeets[index] = seriesTicksMeets[index] ? seriesTicksMeets[index] + 1 : 1; break;
        //         case 3: seriesTicksAbove[index] = seriesTicksAbove[index] ? seriesTicksAbove[index] + 1 : 1; break;
        //         }
        //     }
        // });

        // const categories = [];
        // for (let i = minYears; i <= maxYears; i++) {
        //     categories.push(i);
        // }

        // const series = [
        //     { name: 'Below Expectation', data: seriesTicksBelow },
        //     { name: 'Meets Expectation', data: seriesTicksMeets },
        //     { name: 'Above Expectation', data: seriesTicksAbove }
        // ];

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
                    }
                },
                scaling: 0
            },
            series: [{
                data: [
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
                ],
                color: '#06c0b3',
                maxPointWidth: 8
            }]
        };
    }

    isInFilter(record) {
        // let retVal = true;

        // if (this.chartFilters[0].selectedItems.length > 0) {
        //     retVal = this.chartFilters[0].selectedItems.includes(record['Geography']);
        // }

        // if (this.chartFilters[1].selectedItems.length > 0) {
        //     retVal = this.chartFilters[1].selectedItems.includes(record['CompensationElement']);
        // }

        // if (this.chartFilters[2].selectedItems.length > 0) {
        //     retVal = this.chartFilters[2].selectedItems.includes(record['JobFunction']);
        // }

        // if (this.chartFilters[3].selectedItems.length > 0) {
        //     retVal = this.chartFilters[3].selectedItems.includes(record['JobFamily']);
        // }

        // return retVal;
    }

    onChartFiltersChange(event) {
        // this.updateChartContent();
    }
}
