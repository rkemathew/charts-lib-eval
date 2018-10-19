import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
import { CsvUtilsService } from './modules/shared/services/csv-utils.service';
import { SelectItem } from 'primeng/api';
import { ResolvedStaticSymbol } from '@angular/compiler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    data = null;
    geographyFilter: SelectItem[] = [];
    compensationElementFilter: SelectItem[] = [];
    jobFunctionFilter: SelectItem[] = [];
    jobFamilyFilter: SelectItem[] = [];

    selectedGeographyFilter = [];
    selectedCompensationElementFilter = [];
    selectedJobFunctionFilter = [];
    selectedJobFamilyFilter = [];
    allFiltersCount = 0;

    chartOptions = null;
    chart = null;
    isShowDialog = false;

    constructor(
        private csvUtils: CsvUtilsService,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        this.http.get('assets/kf-payh-poc-charts-sample-data.csv', { responseType: 'text' }).subscribe((csvData) => {
            const data = this.csvUtils.csvToJSON(csvData);
            this.data = data;
            this.updateFilters();
            this.updateChartData();
        });
    }

    updateFilters() {
        const distinctGeographies = [];
        const distinctCompensationElements = [];
        const distinctJobFunctions = [];
        const distinctJobFamilies = [];

        this.data.forEach((record) => {
            const geography = record['Geography'];
            const compensationElement = record['CompensationElement'];
            const jobFunction = record['JobFunction'];
            const jobFamily = record['JobFamily'];

            if (!distinctGeographies.includes(geography)) {
                distinctGeographies.push(geography);
            }

            if (!distinctCompensationElements.includes(compensationElement)) {
                distinctCompensationElements.push(compensationElement);
            }

            if (!distinctJobFunctions.includes(jobFunction)) {
                distinctJobFunctions.push(jobFunction);
            }

            if (!distinctJobFamilies.includes(jobFamily)) {
                distinctJobFamilies.push(jobFamily);
            }
        });

        distinctGeographies.forEach((geography, index) => {
            this.geographyFilter.push({ label: geography, value: geography });
        });

        distinctCompensationElements.forEach((compensationElement, index) => {
            this.compensationElementFilter.push({ label: compensationElement, value: compensationElement});
        });

        distinctJobFunctions.forEach((jobFunction, index) => {
            this.jobFunctionFilter.push({ label: jobFunction, value: jobFunction });
        });

        distinctJobFamilies.forEach((jobFamily, index) => {
            this.jobFamilyFilter.push({ label: jobFamily, value: jobFamily });
        });
    }

    updateChartData() {
        let minYears = Number.MAX_VALUE;
        let maxYears = Number.MIN_VALUE;
        this.data.forEach((record) => {
            const yearsEmployed = +record['YearsEmployed'];
            if (yearsEmployed < minYears) {
                minYears = yearsEmployed;
            }

            if (yearsEmployed > maxYears) {
                maxYears = yearsEmployed;
            }
        });

        const seriesTicksBelow = new Array(maxYears - 1).fill(0, 0, maxYears - 1);
        const seriesTicksMeets = new Array(maxYears - 1).fill(0, 0, maxYears - 1);
        const seriesTicksAbove = new Array(maxYears - 1).fill(0, 0, maxYears - 1);

        this.data.forEach((record) => {
            const yearsEmployed = +record['YearsEmployed'];
            if (this.isInFilter(record)) {
                const index = yearsEmployed - 1;
                const expectations = +record['Expectations'];
                switch (expectations) {
                case 1: seriesTicksBelow[index] = seriesTicksBelow[index] ? seriesTicksBelow[index] + 1 : 1; break;
                case 2: seriesTicksMeets[index] = seriesTicksMeets[index] ? seriesTicksMeets[index] + 1 : 1; break;
                case 3: seriesTicksAbove[index] = seriesTicksAbove[index] ? seriesTicksAbove[index] + 1 : 1; break;
                }
            }
        });

        const categories = [];
        for (let i = minYears; i <= maxYears; i++) {
            categories.push(i);
        }

        const series = [
            { name: 'Below Expectation', data: seriesTicksBelow },
            { name: 'Meets Expectation', data: seriesTicksMeets },
            { name: 'Above Expectation', data: seriesTicksAbove }
        ];

        this.chartOptions = this.getChartOptions(categories, series);
        this.chart = new Chart(this.chartOptions);
    }

    getChartOptions(categories, series) {
        return {
            chart: {
                type: 'column',
                plotBackgroundColor: '#F8F8F8'
            },
            title: {
                text: '',
                floating: true
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Years Employed'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Compensation (Millions)',
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
                width: 150,
                padding: 30,
                margin: 20,
                verticalAlign: 'top',
                floating: false,
                borderRadius: 5,
                itemMarginBottom: 10,
                backgroundColor: '#FAFAFA',
                symbolRadius: 0,
                shadow: false
            },
            credits: {
                enabled: false
            },
            series: series
        };
    }

    isInFilter(record) {
        let retVal = true;

        if (this.selectedGeographyFilter.length > 0) {
            retVal = this.selectedGeographyFilter.includes(record['Geography']);
        }

        if (this.selectedCompensationElementFilter.length > 0) {
            retVal = this.selectedCompensationElementFilter.includes(record['CompensationElement']);
        }

        if (this.selectedJobFunctionFilter.length > 0) {
            retVal = this.selectedJobFunctionFilter.includes(record['JobFunction']);
        }

        if (this.selectedJobFamilyFilter.length > 0) {
            retVal = this.selectedJobFamilyFilter.includes(record['JobFamily']);
        }

        return retVal;
    }

    showFilters() {
        this.isShowDialog = true;
    }

    onFilterChange(event, filterType) {
        this.allFiltersCount =
            this.selectedGeographyFilter.length + this.selectedCompensationElementFilter.length +
            this.selectedJobFunctionFilter.length + this.selectedJobFamilyFilter.length;
        this.updateChartData();
    }
}
