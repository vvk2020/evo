import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';

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
    }
}
TableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TableComponent, selector: "lib-table", ngImport: i0, template: "<!-- <section class=\"section\">\n  <h2 class=\"title\">\u0420\u0443\u0441\u0441\u043A\u0438\u0435 \u0440\u043E\u043A-\u0433\u0440\u0443\u043F\u043F\u044B</h2>\n  <ng-template #tableTemplate let-data=\"data\">\n    <table mat-table [dataSource]=\"data\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"id\">\n        <th mat-header-cell *matHeaderCellDef>#</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.id }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef>\u0413\u0440\u0443\u043F\u043F\u0430</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.name }}</td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </ng-template>\n\n  <ng-container\n    *ngTemplateOutlet=\"tableTemplate; context: { data: users }\"\n  ></ng-container>\n</section> -->\n\n<h2>UUUUUUUUUUUUUU</h2>\n", styles: [".section{display:block;margin-inline:20px 10px 10px}h2.title{margin:0;padding:10px;color:#fff;text-transform:uppercase;background-image:linear-gradient(to right,#3f51b5,#f44336)}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-table', standalone: false, template: "<!-- <section class=\"section\">\n  <h2 class=\"title\">\u0420\u0443\u0441\u0441\u043A\u0438\u0435 \u0440\u043E\u043A-\u0433\u0440\u0443\u043F\u043F\u044B</h2>\n  <ng-template #tableTemplate let-data=\"data\">\n    <table mat-table [dataSource]=\"data\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"id\">\n        <th mat-header-cell *matHeaderCellDef>#</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.id }}</td>\n      </ng-container>\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef>\u0413\u0440\u0443\u043F\u043F\u0430</th>\n        <td mat-cell *matCellDef=\"let element\">{{ element.name }}</td>\n      </ng-container>\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </ng-template>\n\n  <ng-container\n    *ngTemplateOutlet=\"tableTemplate; context: { data: users }\"\n  ></ng-container>\n</section> -->\n\n<h2>UUUUUUUUUUUUUU</h2>\n", styles: [".section{display:block;margin-inline:20px 10px 10px}h2.title{margin:0;padding:10px;color:#fff;text-transform:uppercase;background-image:linear-gradient(to right,#3f51b5,#f44336)}\n"] }]
        }] });

class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: TableModule, declarations: [TableComponent], exports: [TableComponent] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TableComponent],
                    imports: [],
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
