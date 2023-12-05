import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule, RouterOutlet],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  bg = '../../../../assets/logo.jpg';
}
