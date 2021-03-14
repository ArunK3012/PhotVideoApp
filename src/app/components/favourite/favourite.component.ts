import { environment } from './../../../environments/environment';
import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  data: any = [];
  searchName = '';
  isPhoto = true;
  details: any = [];
  videoDetails: any = [];
  // ngif = false;

  constructor(private service: ApiServiceService,
              private commonservice: CommonServiceService) { }

  ngOnInit(): void {
    this.data = this.commonservice.getFavourites();
    if (this.data !== null) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].photographer !== undefined) {
          this.details.push(this.data[i]);
        }
        if (this.data[i].photographer === undefined) {
          this.videoDetails.push(this.data[i]);
        }
      }
    }
  }

  displayVideo(name: string): void{
    this.searchName = name;
  }

  removeFavourite(event: MouseEvent, id: number): void{
    this.commonservice.removeCurrentFavourite(id);
    event.stopPropagation();
  }
}
