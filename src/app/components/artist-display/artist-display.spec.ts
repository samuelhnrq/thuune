import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDisplay } from './artist-display';

describe('ArtistDisplay', () => {
  let component: ArtistDisplay;
  let fixture: ComponentFixture<ArtistDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
