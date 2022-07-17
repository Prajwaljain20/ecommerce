import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  mySideNav: string = '0';
  main: string = '0';
  open = false;
  display = 'none';

  constructor() {}

  ngOnInit(): void {}

  closeNav() {
    this.mySideNav = '0';
    this.main = '0';
  }

  searchbar(query: string) {
    this.search.emit(query);
  }
  openNav() {
    if (this.open) {
      this.open = false;
      this.closeNav();
    } else {
      this.open = true;
      this.mySideNav = '250px';
      this.main = '250px';
    }
  }
}
