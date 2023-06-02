import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit{

  images:any;
  constructor(
    private imageService: ImageService
  ){}

  selectedIndex=0;
  ngOnInit(): void {
    this.images = this.imageService.ticketImages;
    console.log(this.images);
  }
}
