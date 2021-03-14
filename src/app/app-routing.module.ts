import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { PhotoComponent } from './components/photo/photo.component';
import { VideoComponent } from './components/video/video.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/photo', component: PhotoComponent },
  { path: 'home/video', component: VideoComponent },
  { path: 'home/favourite', component: FavouriteComponent },
  { path: 'home/photo/details/:id', component: DetailsPageComponent },
  { path:  'home/video/details/:id', component: VideoDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
