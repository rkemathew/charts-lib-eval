import { Component, OnInit } from '@angular/core';
import { ChartHeader } from '../../models/ChartHeader.model';
import { ChartFilter } from '../../models/ChartFilter.model';
import { ChartContent } from '../../models/ChartContent.model';
import { HttpClient } from '@angular/common/http';
import { CsvUtilsService } from '../../services/csv-utils.service';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-high-charts1',
    templateUrl: './high-charts1.component.html',
    styleUrls: ['./high-charts1.component.less'],
})
export class HighCharts1Component implements OnInit {
    data = null;
    geographyFilter: SelectItem[] = [];
    compensationElementFilter: SelectItem[] = [];
    jobFunctionFilter: SelectItem[] = [];
    jobFamilyFilter: SelectItem[] = [];
    isRenderReady = false;

    constructor(
        private http: HttpClient,
        private csvUtils: CsvUtilsService,
    ) {}

    ngOnInit() {
        this.http.get('assets/kf-payh-poc-charts-sample-data.csv', { responseType: 'text' }).subscribe((csvData) => {
            const data = this.csvUtils.csvToJSON(csvData);
            this.data = data;
            this.updateFilters();
            // this.updateChartData();
            this.isRenderReady = true;
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

    get ChartHeader(): ChartHeader {
        return {
            category: 'Pay for Performance',
            title: 'Pay for Performance Over Time - High Charts',
            description: `
                This report summarized how your pay for performance data relates to both tenure and job level within your organization.
                Analysis of this data can help you see if you are differentiating pay based upon performance and the potential impact tenure
                has on overall pay.
            `
        };
    }

    get ChartFilters(): ChartFilter[] {
        return [
            { category: 'Main', subCategory: 'Geography', items: this.geographyFilter, selectedItems: [] },
            { category: 'Main', subCategory: 'Compensation Element', items: this.compensationElementFilter, selectedItems: [] },
            { category: 'Main', subCategory: 'Job Function', items: this.jobFunctionFilter, selectedItems: [] },
            { category: 'Main', subCategory: 'Job Family', items: this.jobFamilyFilter, selectedItems: [] },
        ];
    }

    get ChartContent(): ChartContent {
        return {
            getData: () => {
                return [
                    [ { something: 'anything' } ]
                ];
            }
        };
    }
}
