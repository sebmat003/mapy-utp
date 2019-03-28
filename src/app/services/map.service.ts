import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MapService {
  private httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {}

  getMapImage(imageUrl: string): Observable<Blob> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type' : 'image/svg+xml'});
    return this.httpClient.get(imageUrl, {headers: this.httpHeaders, responseType: 'blob'});
  }
}
