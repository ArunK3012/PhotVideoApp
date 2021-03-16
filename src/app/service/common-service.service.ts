import { Favourite } from './../components/inteface/favourite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  favourites: Favourite[] = [];
  searchItem = 'animal';

  constructor() { }

  saveFavourites(data: any): void {
    this.favourites = JSON.parse(localStorage.getItem('Favourites') || '');
    this.favourites.push(data);
    localStorage.setItem('Favourites', JSON.stringify(this.favourites));
  }

  removeCurrentFavourite(data: any): void{
    this.favourites = JSON.parse(localStorage.getItem('Favourites') || '');
    if (this.favourites !== null) {
      const index = this.favourites.findIndex(item => item.id === data.id);
      this.favourites.splice(index, 1);
      localStorage.setItem('Favourites', JSON.stringify(this.favourites));
    }
  }

  checkFavourites(data: Favourite): boolean {
    this.favourites = JSON.parse(localStorage.getItem('Favourites') || 'null');
    if (this.favourites !== null) {
      return this.favourites.findIndex(item => item.id === data.id) >= 0;
    }
    return false;
  }

  getFavourites(): any{
    this.favourites = JSON.parse(localStorage.getItem('Favourites') || 'null');
    return this.favourites;
  }
}
