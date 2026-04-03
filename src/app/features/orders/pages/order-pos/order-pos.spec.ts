import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPos } from './order-pos.component';

describe('OrderPos', () => {
  let component: OrderPos;
  let fixture: ComponentFixture<OrderPos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPos]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderPos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
