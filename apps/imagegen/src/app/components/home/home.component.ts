import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageService} from "../../services/image.service";
import {FormsModule} from "@angular/forms";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  styleOptions = [
    "Select a style",
    "Abandoned",
    "Airbnb",
    "Amish",
    "Art",
    "Baroque",
    "Biophilic",
    "Bohemian",
    "Burned down",
    "Chinese New Year",
    "Christmas",
    "Coastal",
    "Colonial",
    "Contemporary",
    "Cottagecore",
    "Craftsman",
    "Cyberpunk",
    "Easter",
    "Edwardian",
    "Farmhouse",
    "French Country",
    "Futuristic",
    "Gamer Room",
    "Georgian",
    "Gothic",
    "Greek",
    "Halloween",
    "Industrial",
    "Japanese Design",
    "Luxurious",
    "Maximalist",
    "Medieval",
    "Mediterranean",
    "Midcentury",
    "Minimalist",
    "Modern",
    "Moroccan",
    "Nautical",
    "Neoclassic",
    "Retro",
    "Rustic",
    "Scandinavian",
    "Sketch",
    "Spa",
    "Steampunk",
    "Tribal",
    "Tropical",
    "Tuscan",
    "Victorian",
    "Vintage",
    "Zen"
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedStyle: string = this.styleOptions[0];

  resultImageData: string = '';
  refImageUrl: string = '';
  prompt = 'african theme and furniture';
  loading = false;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {
  }

  useDefault(event: any) {
    event.stopPropagation();
    const imageUrl = window.location.origin + '/assets/images/blank-room.jpg';
    this.triggerFileUploadWithImageUrl(imageUrl)
      .then();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.refImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.refImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async triggerFileUploadWithImageUrl(imageUrl: string) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' }); // Adjust filename and type as needed

      const event = new Event('change', { bubbles: true });
      const input = new DataTransfer();
      input.items.add(file);
      this.fileInput.nativeElement.files = input.files;
      this.fileInput.nativeElement.dispatchEvent(event);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  generateImage() {
    this.loading = true;
    this.resultImageData = '';
    this.imageService.generateImage(this.selectedStyle, this.refImageUrl).subscribe(
      (response) => {
        this.resultImageData = URL.createObjectURL(response);
        this.loading = false;
      },
      (error) => {
        console.error('Error generating image:', error);
        this.loading = false;
      }
    );
  }
}
