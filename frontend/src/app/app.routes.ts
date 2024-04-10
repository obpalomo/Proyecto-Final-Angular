import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FilmsComponent } from './pages/films/films.component';
import { loginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent,
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"register",
        component: RegisterComponent
    },
    {
        path:"films",
        component: FilmsComponent,
        children:[{
            component: FilmsComponent,
            path:":id"
        }],
        canActivate:[loginGuard]
    },
];

