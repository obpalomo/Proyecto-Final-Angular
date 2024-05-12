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
      // Ocultar detalles si ya está seleccionado
      this.selectedFilm = null;
    } else {
      // Mostrar detalles
      this.selectedFilm = film;
    }
  }

  deleteMovie(film: Film) {
    if (confirm(`Are you sure you want to delete "${film.title}"?`)) {
      this.filmService.deleteOne(film._id)
        .subscribe(response => {
          // Manejer el delete al hacer click
          const index = this.films.findIndex(f => f._id === film._id);
          if (index > -1) {
            this.films.splice(index, 1);
          }
        }, error => {
          // Error en el manejo del delete
          console.error('Error deleting movie:', error);
        });
    }
  }
}

