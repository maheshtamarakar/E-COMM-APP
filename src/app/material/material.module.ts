import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

const MaterialComponents = [
  MatSnackBarModule
]



@NgModule({
  declarations: [],
  imports: [
    MaterialComponents,
    MatIconModule,
    MatBadgeModule,
  ],
  exports: [
    MaterialComponents,
    MatIconModule,
    MatBadgeModule,
  ]
})
export class MaterialModule { }
