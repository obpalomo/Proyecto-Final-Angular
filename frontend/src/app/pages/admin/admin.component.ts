import { FilmCreateData } from './../../interfaces/dto/film-create-data';
import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  newFilm: FormGroup = this.builder.group({
    title: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    director: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    synopsis: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  constructor(
    private builder: FormBuilder,
    private filmService: FilmService,
    private http: HttpClient
  ) {}

  addMovie() {
    const createFilm: FilmCreateData = {
      title: this.newFilm.get('title')?.value,
      year: this.newFilm.get('year')?.value,
      director: this.newFilm.get('director')?.value,
      category: this.newFilm.get('category')?.value,
      synopsis: this.newFilm.get('synopsis')?.value,
      image: this.newFilm.get('image')?.value
    };
    this.filmService.insert(createFilm)
    .subscribe({
      next: (res:any) => alert('Película añadida correctamente'),
      error: (err) => console.log('Error al añadir la película', err)
      
    })


  }
}
