import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageService} from "../services/image.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public prompt = '';
  imageData: string = '';

  constructor(private imageService: ImageService) {}

  generateImage() {
    this.imageService.generateImage(this.prompt).subscribe(
      (response) => {
        this.imageData = URL.createObjectURL(response);
      },
      (error) => {
        console.error('Error generating image:', error);
      }
    );
  }
}
