import { Favourite } from './../inteface/favourite';
import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {

  @ViewChild('videoplayer') videoPlayer!: ElementRef;

  searchName = '';
  data: any = [];
  image = '';
  androidImage = '';
  playVideo = false;
  name = '';
  playBtn = true;
  currentTime: any;
  pauseTime: any;
  video: any;
  juice: any;
  btn: any;
  btns: any;
  videos: any;
  scroll: any;
  fullScreen: any;

  constructor(private router: Router,
    private service: ApiServiceService,
    private commonService: CommonServiceService) { }

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    this.service.getVideoDetails(id).subscribe(res => {
      this.data = res;
      this.image = res.video_files[0].link;
      this.name = res.user.name;
    });
  }

  displayPhoto(name: string): void {
    this.searchName = name;
  }

  toggleVideo(event: any) {
    this.videoPlayer.nativeElement.play();
  }

  playVideoButton() {
    this.playVideo = true;
    this.playBtn = false;
  }

  addToFavourite(id: any): void {
    this.commonService.saveFavourites(id);
  }

  removeFavourite(id: number): void {
    this.commonService.removeCurrentFavourite(id);
  }

  favouriteAdded(index: Favourite): any {
    return this.commonService.checkFavourites(index);
  }

  goBack(): void {
    window.history.back();
  }

  toggle() {
    this.video = document.getElementById('video-pause');
    this.juice = document.getElementById('bar');
    this.btn = document.getElementById('play-pause');

    if (this.video.paused) {
      this.btn.className = 'pause';
      this.video.play();
      this.playBtn = false;
    }
    else {
      this.btn.className = 'play';
      this.playBtn = true;
      this.video.pause();
    }

    this.video.addEventListener('timeupdate', () => {
      var juicePos = this.video.currentTime / this.video.duration;
      this.juice.style.width = juicePos * 100 + '%';
      if (this.video.ended) {
        this.btn.className = 'play';
        this.playBtn = true;
      }
    });
  }


  openFullscreen(): void {
    if (this.video.requestFullscreen){
      this.video.requestFullscreen();
    }
  }
}

