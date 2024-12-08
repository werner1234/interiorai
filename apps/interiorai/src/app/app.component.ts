import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home.component";

@Component({
  imports: [RouterModule, HomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interiorai';
}
