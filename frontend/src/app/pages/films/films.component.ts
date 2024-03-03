import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';
import { log } from 'console';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnInit {
  films: Film[] = []

  constructor(private filmService: FilmService){}

  ngOnInit(): void {
    this.filmService.findAll().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      
      
    })
  }
}
