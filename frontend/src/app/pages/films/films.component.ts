import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css',
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  selectedFilm: Film | null = null;


  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.findAll().subscribe({
      next: (films:any) => this.films = films,
      error: (err) => console.log(err),
    });
  }

  showDetails(film: Film) {
    if (this.selectedFilm?.title === film.title) {
      // Hide details if already selected
      this.selectedFilm = null;
    } else {
      // Show details for the newly clicked movie
      this.selectedFilm = film;
    }
  }
}

