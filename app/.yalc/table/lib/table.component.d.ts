import { MatTableDataSource } from '@angular/material/table';
import * as i0 from "@angular/core";
export declare class TableComponent {
    displayedColumns: string[];
    users: {
        id: number;
        name: string;
    }[];
    data: MatTableDataSource<{
        id: number;
        name: string;
    }, import("@angular/material/table").MatTableDataSourcePaginator>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "lib-table", never, {}, {}, never, never, false, never>;
}
