import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-videollamada',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent],
  templateUrl: './videollamada.component.html',
  styleUrl: './videollamada.component.css',
})
export class VideollamadaComponent implements AfterViewInit {
  @ViewChild('video')
  public video!: ElementRef<HTMLVideoElement>;
  error: any;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          if (this.video) {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
            this.error = null;
          }
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  onPlay() {
    if (this.video) {
      this.video.nativeElement.play();
    }
  }

  onPause() {
    if (this.video) {
      this.video.nativeElement.pause();
    }
  }

}
