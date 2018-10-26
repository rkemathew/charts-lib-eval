import { Component, OnInit, Input } from '@angular/core';
import { ChartHeader } from '../../models/ChartHeader.model';
import { ChartFilter } from '../../models/ChartFilter.model';
import { ChartContent } from '../../models/ChartContent.model';

@Component({
    selector: 'app-chart-framework',
    templateUrl: './chart-framework.component.html',
    styleUrls: ['./chart-framework.component.less'],
})
export class ChartFrameworkComponent implements OnInit {
    @Input() chartHeader: ChartHeader;
    @Input() chartFilters: ChartFilter[];
    @Input() chartContent: ChartContent;

    ngOnInit() {}
}
