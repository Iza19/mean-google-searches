import {Component, Input} from '@angular/core';
import {Search} from '../search';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})

export class SearchDetailsComponent {

  @Input()
  search: Search;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private searchService: SearchService) {
  }

  createSearch(search: Search) {
    this.searchService.createSearch(search).then((newSearch: Search) => {
      this.createHandler(newSearch);
    });
  }

  deleteSearch(searchId: String): void {
    this.searchService.deleteSearch(searchId).then((deletedSearchId: String) => {
      this.deleteHandler(deletedSearchId);
    });
  }
}
