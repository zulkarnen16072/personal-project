import { I18nPluralPipe } from '@angular/common';
import { ReadVarExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; 

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;

  previewImg: any;

  isUploading: boolean;
  

  constructor(
    public dialogRef: MatDialogRef<ImageUploaderComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    public storage: AngularFireStorage,
    public db: AngularFirestore,

  ) { }

  ngOnInit(): void {
  }

 



  selectedItem: any;

  onFileChange(event)
  {
    if (event.target.files.length > 0) 
    {
      this.selectedItem = event.target.files[0];
      // get url 
      let reader = new FileReader();
      reader.onload = e => this.previewImg = reader.result
      reader.readAsDataURL(event.target.files[0])
    }
    
  }

  
    
    
 

  

  downFile: any;
  uploadFile()
  {
    let safeName = this.selectedItem.name.replace(/[^a-z0-9.]+/gi, '').toLowerCase();
    let timestamp = Date.now();
    var uniqueSafeName = timestamp + '_' + safeName;
    var path = 'images/' + uniqueSafeName;
    this.isUploading = true;
    var fileRef = this.storage.ref(path);
    var task = this.storage.upload(path, this.selectedItem);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    
            // get notified when the download URL is available  
      task.snapshotChanges().pipe(
        finalize ( () => { fileRef.getDownloadURL().subscribe(
          res => {this.downloadURL = res;

            this.db.collection('products').doc(this.data.id).update({ // update / simpan data download file ke database.
              url: this.downloadURL,
              storagePath: path
            }).then(res => {
              this.isUploading = false;
              this.dialogRef.close()
              console.log('Berhasil' + res)
            })
              
              .catch(e => {
                this.isUploading = false;  
                console.error('Error' + e)})
           });     
        })
     )
    .subscribe(res => { console.log(res);  })
  


    
    

  }





}
