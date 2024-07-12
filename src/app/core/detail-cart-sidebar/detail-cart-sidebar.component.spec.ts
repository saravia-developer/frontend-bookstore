import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCartSidebarComponent } from './detail-cart-sidebar.component';

describe('DetailCartSidebarComponent', () => {
  let component: DetailCartSidebarComponent;
  let fixture: ComponentFixture<DetailCartSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCartSidebarComponent]
    });
    fixture = TestBed.createComponent(DetailCartSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
