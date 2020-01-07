import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {


  // id = 1 - Kordeckiego
  // id = 2 - Kaliskiego
  // id = 3 - Kaliskiego 12-14
  // id = 4 - Bernardyńska
  // id = 5 - Fordońska
  // id = 6 - Mazowiecka
  // id = 7 - Seminaryjna 3-5
  // id = 8 - Koszarowa
  // id = 9 - Sucha
  // id = 10 - Hetmańska

  public showLocation: boolean = false;
  public clickedButton: number = 0;
  public locationState: number = 2;

  constructor() {}


}
