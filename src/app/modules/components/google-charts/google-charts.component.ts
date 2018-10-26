import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
import { CsvUtilsService } from '../../services/csv-utils.service';
import { SelectItem } from 'primeng/api';
import { ChartReadyEvent } from 'ng2-google-charts';

@Component({
    selector: 'app-google-charts',
    templateUrl: './google-charts.component.html',
    styleUrls: ['./google-charts.component.less'],
})
export class GoogleChartsComponent implements OnInit {
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

    @ViewChild('theChart') theChart;

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
        const dataTable = [['Year', 'Below Expectation', 'Meets Expectation', 'Above Expectation']];
        categories.forEach((category, index) => {
            const belowExpectation = series[0].data[index];
            const meetsExpectation = series[1].data[index];
            const aboveExpectation = series[2].data[index];
            dataTable.push([category, belowExpectation, meetsExpectation, aboveExpectation]);
        });
        return {
            chartType: 'ColumnChart',
            options: {
                width: 1200,
                height: 563,
            },
            dataTable: dataTable,
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

    chartReady(event: ChartReadyEvent) {
        const legend = this.theChart.el.nativeElement
            .querySelector('svg')
            .querySelector('g')
            .querySelector('rect');
        legend.setAttribute('class', 'chart-legend-svg');
    }
}
