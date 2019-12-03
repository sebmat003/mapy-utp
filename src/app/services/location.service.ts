import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {

  public showLocation: boolean = false;
  public clickedButton: number = 0;
  public locationState: number = 0;

  constructor() {}


}
