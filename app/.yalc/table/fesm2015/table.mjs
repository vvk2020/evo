import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i2 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class TableComponent {
    constructor() {
        this.displayedColumns = ['id', 'name'];
        this.users = [
            { id: 1, name: 'Сплин' },
            { id: 2, name: 'Кино' },
            { id: 3, name: 'Машина времени' },
            { id: 4, name: 'Би-2' },
            { id: 5, name: 'ДДТ' },
            { id: 6, name: 'Аквариум' },
            { id: 7, name: 'Nautilus Pompilius' },
            { id: 8, name: 'Ночные снайперы' },
            { id: 9, name: 'Пикник' },
            { id: 10, name: 'Чайф' },
        ];
        this.data = new MatTableDataSource(this.users);
    }
}
TableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TableComponent, selector: "lib-table", ngImport: i0, template: "<section class=\"section\">\n  <h2 class=\"title\">\u0420\u0443\u0441\u0441\u043A\u0438\u0435 \u0440\u043E\u043A-\u0433\u0440\u0443\u043F\u043F\u044B</h2>\n  <ng-template #tableTemplate let-data=\"data\">\n    <table mat-table [dataSource]=\"data\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"id\">\n        <th mat-header-cell *matHeaderCellDef>#</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.id }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef>\u0413\u0440\u0443\u043F\u043F\u0430</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.name }}</td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </ng-template>\n\n  <ng-container\n    *ngTemplateOutlet=\"tableTemplate; context: { data: users }\"\n  ></ng-container>\n</section>\n", styles: [".section{display:block;margin-inline:20px 10px 10px}h2.title{margin:0;padding:10px;color:#fff;text-transform:uppercase;background-image:linear-gradient(to right,#3f51b5,#f44336)}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i2.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i2.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-table', standalone: false, template: "<section class=\"section\">\n  <h2 class=\"title\">\u0420\u0443\u0441\u0441\u043A\u0438\u0435 \u0440\u043E\u043A-\u0433\u0440\u0443\u043F\u043F\u044B</h2>\n  <ng-template #tableTemplate let-data=\"data\">\n    <table mat-table [dataSource]=\"data\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"id\">\n        <th mat-header-cell *matHeaderCellDef>#</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.id }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef>\u0413\u0440\u0443\u043F\u043F\u0430</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.name }}</td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </ng-template>\n\n  <ng-container\n    *ngTemplateOutlet=\"tableTemplate; context: { data: users }\"\n  ></ng-container>\n</section>\n", styles: [".section{display:block;margin-inline:20px 10px 10px}h2.title{margin:0;padding:10px;color:#fff;text-transform:uppercase;background-image:linear-gradient(to right,#3f51b5,#f44336)}\n"] }]
        }] });

class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: TableModule, declarations: [TableComponent], imports: [CommonModule, MatTableModule], exports: [TableComponent] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule, imports: [CommonModule, MatTableModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TableComponent],
                    imports: [CommonModule, MatTableModule],
                    exports: [TableComponent],
                }]
        }] });

/*
 * Public API Surface of table
 */
// export * from './lib/table.service';

/**
 * Generated bundle index. Do not edit.
 */

export { TableComponent, TableModule };
//# sourceMappingURL=table.mjs.map
