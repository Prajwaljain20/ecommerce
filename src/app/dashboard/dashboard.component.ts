import { Component, OnInit } from '@angular/core';
import { ICategory } from '../models/category.interface';
import { IMap } from '../models/mapcategory.interface';
import { ISubcategory } from '../models/subcategory.interface';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  category$!: ICategory[];
  subcategory$!: ISubcategory[];
  mapCategory: IMap[] = [];
  loading = false;
  count = 0;

  data = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPthtGKRatqJUthTMZSuVz0vqf15v6cqnE3A&usqp=CAU',
      title: 'Slide 1',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-hTZzI56fSSntR_1M_xpGU76MemWx2REfA&usqp=CAU',
      title: 'Slide 2',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCjAjh_5DGz5wG099EUPjvpmSYG-4SAIAG6Q&usqp=CAU',
      title: 'Slide 3',
    },
  ];

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.category.getCategory().subscribe((res) => {
      this.category$ = res;
      this.category.getSubcategory().subscribe((res) => {
        this.subcategory$ = res;
        if (this.count == 0) {
          for (let i = 0; i < this.category$.length; i++) {
            this.mapCategory.push({
              id: this.category$[i].id,
              image: this.category$[i].image,
              category: this.category$[i].name,
              subcategory: this.subcategory$[i].name,
            });
          }
        }
        this.loading = false;
        this.count++;
      });
    });
  }
}
