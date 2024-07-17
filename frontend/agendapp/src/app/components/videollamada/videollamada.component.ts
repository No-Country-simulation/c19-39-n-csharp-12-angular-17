import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videollamada',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent],
  templateUrl: './videollamada.component.html',
  styleUrl: './videollamada.component.css',
})
export class VideollamadaComponent implements OnInit, OnDestroy {
  @ViewChild('video')
  public video!: ElementRef<HTMLVideoElement>;
  error: any;
  private stream!: MediaStream;

  async ngOnInit() {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
        }
      } catch (e) {
        console.error('Error al acceder a la cámara: ', e);
      }
    } else {
      console.error('El navegador no soporta getUserMedia');
    }
  }

  pauseStream(){
    if(this.stream){
     this.video.nativeElement.pause();
    } else {
      console.error('No hay stream para pausar');
    }
  }

  playStream(){
    if(this.stream){
      this.video.nativeElement.play();
    } else {
      console.error('No hay stream para reproducir');
    }
  }

  stopStream() {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => track.stop());
      this.video.nativeElement.srcObject = null;
    } else {
      console.error('No hay stream para detener');
    }
  }

  ngOnDestroy() {
    this.stopStream();
  }

  // async ngAfterViewInit() {
  //   await this.setupDevices();
  // }

  // constructor(private router: Router) {}

  // async setupDevices() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       if (stream) {
  //         if (this.video) {
  //           this.video.nativeElement.srcObject = stream;
  //           this.video.nativeElement.play();
  //           this.error = null;
  //         }
  //       } else {
  //         this.error = 'No tienes dispositivo de salida de video';
  //         console.log('No tienes dispositivo de salida de video');
  //       }
  //     } catch (e) {
  //       this.error = e;
  //       console.log('Mostrar errores: ', e);
  //     }
  //   }
  // }

  // onPlay() {
  //   if (this.video) {
  //     this.video.nativeElement.play();
  //     console.log('Video reproduciendose');
  //   }
  // }

  // onPause() {
  //   if (this.video) {
  //     this.video.nativeElement.pause();

  //     console.log('Video pausado');
  //   }
  // }

  // ngOnDestroy(): void {}
}
