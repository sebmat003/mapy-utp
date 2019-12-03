import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  changeLanguage(number: number) {
    if(number==1) {
      this.translateService.setDefaultLang('pl');
    } else if (number==2) {
      this.translateService.setDefaultLang('en');
    } else {
      //do nothing
    }

  }
}
