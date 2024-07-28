import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-videollamada',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, RouterLink],
  templateUrl: './videollamada.component.html',
  styleUrl: './videollamada.component.css',
})
export class VideollamadaComponent implements OnInit, OnDestroy {
  @ViewChild('video')
  public video: ElementRef<HTMLVideoElement> | undefined;
  error: any;
  private stream!: MediaStream;

  async ngOnInit() {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (this.stream && this.video && this.video.nativeElement) {
          const videoElement = this.video.nativeElement;
          videoElement.srcObject = this.stream;
          videoElement.play();
        }
      } catch (e: any) {
        console.error('Error al acceder a la cámara:', e);
        this.error = `No se pudo acceder a la cámara. Error: ${e.message}`;
      }
    } else {
      console.error('El navegador no soporta getUserMedia');
      this.error =
        'Tu navegador no soporta la funcionalidad de acceso a la cámara.';
    }
  }

  ngOnDestroy() {
    this.stopStream();
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      if (this.video && this.video.nativeElement) {
        this.video.nativeElement.srcObject = null;
      }
    }
  }

  pauseStream() {
    if (this.stream && this.video) {
      this.video.nativeElement.pause();
    } else {
      console.error('No hay stream para pausar');
    }
  }

  playStream() {
    if (this.stream && this.video) {
      this.video.nativeElement.srcObject = this.stream;
      this.video.nativeElement.play();
    } else {
      console.error('No hay stream para reproducir');
    }
  }

}
