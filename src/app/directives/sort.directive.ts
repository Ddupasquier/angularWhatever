import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column?: string;
  direction: SortDirection;
}

@Directive({
  selector: '[appSortable]'
})
export class SortDirective {

  @Input() appSortable?: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  constructor() { }

  @HostListener('click') onClick() {
    this.direction = this.rotateDirection(this.direction);
    this.sort.emit({ column: this.appSortable, direction: this.direction });
  }

  private rotateDirection(current: SortDirection): SortDirection {
    switch (current) {
      case 'asc': return 'desc';
      case 'desc': return '';
      default: return 'asc';
    }
  }
}