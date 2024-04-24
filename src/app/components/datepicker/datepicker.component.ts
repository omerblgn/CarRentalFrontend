import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerI18n,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES: any = {
  tr: {
    weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    months: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
  },
};

@Injectable()
export class I18n {
  language = 'tr';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  private _i18n = inject(I18n);

  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  override parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }
  override format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe, CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatepickerComponent {
  @Output() sendFromDate = new EventEmitter<NgbDate>();
  @Output() sendToDate = new EventEmitter<NgbDate>();

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  minDate = this.calendar.getToday();
  maxDate = this.calendar.getNext(this.calendar.getToday(), 'm', 1);

  onDateSelection(date: NgbDate, datepicker: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.sendFromDate.emit(this.fromDate);
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.sendToDate.emit(this.toDate);
      datepicker.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.sendFromDate.emit(this.fromDate);
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
