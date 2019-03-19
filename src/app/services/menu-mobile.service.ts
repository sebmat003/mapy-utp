import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class MenuMobileService {

  @Output() showLeftMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
}
