import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css'],
})
export class OrderPlacedComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.route.navigate(['']), 5000);
  }
}
