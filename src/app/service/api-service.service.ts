import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
   Authorization: '563492ad6f917000010000019e7778cd0d28423c96949c242b3d32fc'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  BASEURL = 'https://api.pexels.com/';
  photoList: any = [];
  videoList: any = [];
  bgImage: any = [];
  photoDetails: any = [];
  videoDetails: any = [];
  url = 'https://api.pexels.com/v1/search/?page=2&per_page=20&query=animal';

  public responseCache = new Map();

  constructor(private http: HttpClient) { }

  getPhotoList(data: string, pageNo: number): Observable<any>{

    const url = `${this.BASEURL}v1/search?page=${pageNo}&per_page=20&query=${data}`;

    const details = JSON.parse(localStorage.getItem('PhotoList') || 'null');
    if (details !== undefined) {
      for (let i = 0; i < details.length; i++) {
        const item = details[i].next_page;
        if (item !== undefined) {
          const id = item.split('=').pop();
          if (id === data) {
            if (details[i].page === pageNo) {
              return of(details[i]);
            }
          }
        }
      }
    }
    const item =  this.http.get(url, httpOptions);
    item.subscribe(name => {
        this.photoList.push(name);
        localStorage.setItem('PhotoList', JSON.stringify(this.photoList));
      });
    return item;
  }

  getVideoList(data: string, page: number): Observable<any>{

    const url = `${this.BASEURL}videos/search?page=${page}&per_page=20&query=${data}`;

    const details = JSON.parse(localStorage.getItem('VideoList') || 'null');
    if (details !== null) {
      for (let i = 0; i < details.length; i++) {
        const item = details[i].url;
        const id = item.split('/')[5];
        if (id === data) {
          if (details[i].page === page) {
            return of(details[i]);
          }
        }
      }
    }
    const item =  this.http.get(url, httpOptions);
    item.subscribe(name => {
        this.videoList.push(name);
        localStorage.setItem('VideoList', JSON.stringify(this.videoList));
      });
    return item;
  }

  getBgImage(page: number): Observable<any>{

    const url = `https://api.pexels.com/v1/curated?per_page=1`;

    const details = JSON.parse(localStorage.getItem('BackgroundImage') || 'null');
    if (details !== null) {
      if (details.page === page) {
        return of(details);
      }
    }
    const item =  this.http.get(url, httpOptions);
    item.subscribe(name => {
        this.bgImage.push(name);
        localStorage.setItem('BackgroundImage', JSON.stringify(name));
      });
    return item;
  }

  getVideoDetails(data: any): Observable<any> {

    const url = `${this.BASEURL}videos/videos/${data}`;

    const details = JSON.parse(localStorage.getItem('VideoDetails') || 'null');
    if (details !== null) {
      for (let i = 0; i < details.length; i++) {
        const id = (details[i].id).toString();
        if (id === data) {
          return of(details[i]);
        }
      }
    }
    const item = this.http.get(url, httpOptions);
    item.subscribe(name => {
      this.videoDetails.push(name);
      localStorage.setItem('VideoDetails', JSON.stringify(this.videoDetails));
    });
    return item;
  }

  getPhotoDetails(data: any): Observable<any> {

    const url = `${this.BASEURL}v1/photos/${data}`;

    const details = JSON.parse(localStorage.getItem('PhotoDetails') || 'null');
    if (details !== null) {
      for (let i = 0; i < details.length; i++) {
        const id = (details[i].id).toString();
        if (id === data) {
          return of(details[i]);
        }
      }
    }
    const item = this.http.get(url, httpOptions);
    item.subscribe(name => {
      this.photoDetails.push(name);
      localStorage.setItem('PhotoDetails', JSON.stringify(this.photoDetails));
    });
    return item;
  }
}
