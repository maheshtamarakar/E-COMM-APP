import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const MaterialComponents = [
  MatSnackBarModule
]



@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
