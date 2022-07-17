import { TestBed } from '@angular/core/testing';

import { AddSubcategoryService } from './add-subcategory.service';

describe('AddSubcategoryService', () => {
  let service: AddSubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
