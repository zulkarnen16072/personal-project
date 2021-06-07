import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  constructor(
    
  ) { }

  ngOnInit(): void {
  }



  selectedItem: any;

  onFileChange(event)
  {
    if (event.target.files.length > 0) 
    {
      this.selectedItem = event.target.files[0];
      console.log(this.selectedItem)
    }
    
  }

  uploadFile()
  {

  }

}
