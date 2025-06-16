import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameSelect } from './page-game-select';

describe('PageGameSelect', () => {
  let component: PageGameSelect;
  let fixture: ComponentFixture<PageGameSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGameSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
