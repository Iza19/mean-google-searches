import {Injectable} from '@angular/core';
import {Search} from './search';
import {Http, Response} from '@angular/http';

@Injectable()
export class SearchService {
  private searchesUrl = '/api/searches';
  private googleTrends = require('google-trends-api');

  constructor(private http: Http) {
  }

  // get("/api/searches")
  getSearches(): Promise<void | Search[]> {
    return this.http.get(this.searchesUrl)
      .toPromise()
      .then(response => response.json() as Search[])
      .catch(this.handleError);
  }

  // post("/api/searches")
  createSearch(newSearch: Search): Promise<void | Search> {
    const res = this.getTrends(newSearch.text);
    console.log(res);
    return this.http.post(this.searchesUrl, newSearch)
      .toPromise()
      .then(response => response.json() as Search)
      .catch(this.handleError);
  }

  // get("/api/searches/:id") endpoint not used by Angular app

  // delete("/api/searches/:id")
  deleteSearch(delSearchId: String): Promise<void | String> {
    return this.http.delete(this.searchesUrl + '/' + delSearchId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

  private getTrends(text: String) {
    this.googleTrends.interestOverTime({ keyword: text }, function (err, results) {
      if (err) {
        console.error('there was an error!', err);
      } else {
        console.log('my sweet sweet results', results);
      }
    });
  }
}
