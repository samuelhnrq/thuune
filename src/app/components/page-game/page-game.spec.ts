import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGame } from './page-game';

describe('PageGame', () => {
  let component: PageGame;
  let fixture: ComponentFixture<PageGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
