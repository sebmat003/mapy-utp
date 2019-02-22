import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  transform: boolean = false;
  // @Output() emitTransform: EventEmitter<boolean> =  new EventEmitter<boolean>();


  onTransform(stateLeftMenu: boolean) {
    this.transform = stateLeftMenu;
    // this.emitTransform.emit(this.transform);
  }

}
