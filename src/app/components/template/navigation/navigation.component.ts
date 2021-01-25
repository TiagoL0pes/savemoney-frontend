import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isHome(): boolean {
    return location.pathname.indexOf('inicio') >= 0;
  }

  isAuth(): boolean {
    return location.pathname.indexOf('auth') >= 0;
  }

  back(): void {
    window.history.back();
  }

}
