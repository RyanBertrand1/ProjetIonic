import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const URL = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=world-heritage-list%40public-us';
const ROWS = '20';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private http: HttpClient) {}

  getSites(page?, search?, category?, region?, states?): Observable<any> {
    let params = new HttpParams();
    params = params.set('rows', ROWS);

    if (page) {
      const start = (page - 1) * +ROWS;
      params = params.set('start', '' + start);
    }

    if (search) {
      params = params.set('q', search);
    }

    if (category) {
      params = params.set('refine.category', category);
    }

    if (region) {
      params = params.set('refine.region', region);
    }

    if (states) {
      states.forEach(state => {
        params = params.append('refine.states', state);
      });
    }

    return this.http.get(URL, {params});
  }

  getSiteById(id): Observable<any> {
    let params = new HttpParams();
    params = params.set('refine.recordid', id);

    return this.http.get(URL, {params});
  }
}
