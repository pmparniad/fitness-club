import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MatCardModule } from '@angular/material/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export const TimeFORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

const materialModules = [
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

const primengModules = [
  MenubarModule,
  CardModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [],
  imports: [...primengModules, ...materialModules, CommonModule],
  exports: [
    ...primengModules,
    ...materialModules,
    CommonModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: TimeFORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'el-GR' },
  ],
  bootstrap: [],
})
export class SharedModule {}
