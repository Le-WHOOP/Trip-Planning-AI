import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [ TitleCasePipe, MatToolbarModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) title! : string
}
