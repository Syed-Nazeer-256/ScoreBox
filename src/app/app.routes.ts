import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtpConfirmationComponent } from './components/otp-confirmation/otp-confirmation.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'otp-confirmation', component: OtpConfirmationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'game', component: GameComponent },
    { path: 'profile', component: ProfileComponent }
];