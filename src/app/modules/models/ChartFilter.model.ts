import { SelectItem } from 'primeng/api';

export interface ChartFilter {
    category: string;
    subCategory: string;
    items: SelectItem[];
}
