import { Component } from '@angular/core';
import { ArtistSearch } from '../artist-search/artist-search';

@Component({
  selector: 'app-landing-page',
  imports: [ArtistSearch],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {}
