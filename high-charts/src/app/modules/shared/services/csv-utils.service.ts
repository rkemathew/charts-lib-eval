import { Injectable } from '@angular/core';

@Injectable()
export class CsvUtilsService {
    public csvToJSON(csv) {
        let lines = csv.split('\r\n');
        if (lines.length === 0) {
            lines = csv.split('\n');
        }
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        return result;
    }
}
