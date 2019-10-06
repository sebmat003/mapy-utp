import {Component,HostListener, Input, OnInit} from '@angular/core';
import {MenuMobileService} from '../../services/menu-mobile.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';


@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css'],
})
export class SearchingComponent implements OnInit {
  @Input() private transform: boolean = false;
  private display: boolean = false;
  searchingState: number = 1;
  clicked: number = 0;
  private innerWidth: number;
  mobileVersion: boolean = false;
  message: string;
  private started: boolean = false;



  constructor(private LeftMenuMobileService: MenuMobileService, public minimizeButtonService: MinimizeButtonService,
              private speechRecognition: SpeechRecognitionService) {
    this.onResize();
    this.speechRecognition.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
    };

    this.speechRecognition.onaudioend = (e) => {
      this.started = false;
    }
  }


  ngOnInit() {
    this.onResize();
  }

  click() {
    this.display = !this.display;
    this.clicked = 0;
    this.message = '';
  }

  microphone() {
    if(!this.started) {
      this.message = '';
      this.speechRecognition.start();
      this.started = true;
    } else {
      this.speechRecognition.stop();
      this.started = false;
    }

  }

  closeMenu() {
    if(this.display) {
      if(this.clicked == 1) {
        this.display = false;
      } else this.clicked = 1;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileVersion = this.innerWidth <= 1000;
  }


  onShowMobileMenu() {
    this.LeftMenuMobileService.showLeftMenu.emit(true);
  }
}
