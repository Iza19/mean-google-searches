import {Component, OnInit} from '@angular/core';

import {Search} from '../search';
import {SearchService} from '../search.service';
import {SearchDetailsComponent} from '../search-details/search-details.component';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
  providers: [SearchService]
})
export class SearchListComponent implements OnInit {

  searches: Search[];
  selectedSearch: Search;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService
      .getSearches();
  }

  private getIndexOfSearch = (searchId: String) => {
    return this.searches.findIndex((search) => {
      return search._id === searchId;
    });
  }

  selectSearch(search: Search) {
    this.selectedSearch = search;
  }

  createNewSearch() {
    const search: Search = {
      text: '',
      location: {
        latitude: '',
        longitude: ''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectSearch(search);
  }

  deleteSearch = (searchId: String) => {
    const idx = this.getIndexOfSearch(searchId);
    if (idx !== -1) {
      this.searches.splice(idx, 1);
      this.selectSearch(null);
    }
    return this.searches;
  }

  addSearch = (search: Search) => {
    this.searches.push(search);
    this.selectSearch(search);
    return this.searches;
  }
}
