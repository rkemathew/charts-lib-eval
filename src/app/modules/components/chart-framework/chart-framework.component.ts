import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ChartHeader } from '../../models/ChartHeader.model';
import { ChartFilter } from '../../models/ChartFilter.model';
import { ChartContent } from '../../models/ChartContent.model';

import { KfKeyedCollection } from '@kf-products-core/kfhub_lib';

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
    chartFilterMap = new KfKeyedCollection<ChartFilter[]>();
    activeChartType = 'AREA-CHART';

    @Input()  chartHeader:  ChartHeader;
    @Input()  chartFilters: ChartFilter[];
    @Output() chartFiltersChange = new EventEmitter();

    ngOnInit() {
        if (this.chartFilters) {
            this.chartFilters.forEach((chartFilter: ChartFilter) => {
                const key = chartFilter.category;
                let categorizedChartFilters: ChartFilter[] = [];
                if (this.chartFilterMap.ContainsKey(key)) {
                    categorizedChartFilters = this.chartFilterMap.Item(key);
                }

                categorizedChartFilters.push(chartFilter);
                if (!this.chartFilterMap.ContainsKey(key)) {
                    this.chartFilterMap.Add(key, categorizedChartFilters);
                }
            });
        }
    }

    showFilters() {
        this.isShowDialog = true;
    }

    onFilterChange(event) {
        this.allFiltersCount = 0;
        this.chartFilters.forEach((chartFilter: ChartFilter) => {
            this.allFiltersCount += chartFilter.selectedItems.length;
        });

        this.chartFiltersChange.emit(event);
    }

    onSelectedItemChange(event, chartFilter: ChartFilter) {
        chartFilter.selectedItems = event;
    }

    trackBySubCategory(index: number, element: ChartFilter) {
        return element ? element.subCategory : null;
    }
}
