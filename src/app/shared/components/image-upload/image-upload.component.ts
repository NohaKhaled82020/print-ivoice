import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFile } from '../../models/IFile.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent implements OnInit {
  @Input() imageSrc: any;
  userImg!: string | ArrayBuffer | null;

  @Output() changed = new EventEmitter<IFile>();
  constructor() {}

  ngOnInit(): void {}

  uploadImage(ev: any): void {
    const file: File = ev.target.files[0];
    if (!file) {
      return;
    }
    if (file.type.includes('image/png') || file.type.includes('image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userImg = reader.result;
        if (file) {
          this.changed.emit({
            fileData: reader.result!.toString().split(',')[1],
            fileExtension: file.type.replace('image/', ''),
            filename: file.name.toString().split('.')[0],
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
