import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartHeader } from '../../models/ChartHeader.model';
import { ChartFilter } from '../../models/ChartFilter.model';
import { ChartContent } from '../../models/ChartContent.model';

@Component({
    selector: 'app-chart-framework',
    templateUrl: './chart-framework.component.html',
    styleUrls: ['./chart-framework.component.less'],
})
export class ChartFrameworkComponent implements OnInit {
    chart = null;
    chartOptions = null;
    isShowDialog = false;
    allFiltersCount = 0;
    selectedItems = [];

    @Input() chartHeader: ChartHeader;
    @Input() chartFilters: ChartFilter[];
    @Input() chartContent: ChartContent;

    ngOnInit() {
    }

    showFilters() {
        this.isShowDialog = true;
    }

    onFilterChange(event, filterType) {
        this.allFiltersCount = 0;
        this.chartFilters.forEach((chartFilter: ChartFilter) => {
            this.allFiltersCount += chartFilter.selectedItems.length;
        });
        // this.updateChartData();
    }

    trackBySubCategory(index: number, element: ChartFilter) {
        return element ? element.subCategory : null;
    }
}
