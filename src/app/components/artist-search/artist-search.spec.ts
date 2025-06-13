import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearch } from './artist-search';

describe('ArtistSearch', () => {
  let component: ArtistSearch;
  let fixture: ComponentFixture<ArtistSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
