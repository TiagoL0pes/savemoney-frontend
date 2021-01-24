import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MaterialImports = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule
];

@NgModule({
  declarations: [],
  imports: [
    MaterialImports
  ],
  exports: [MaterialImports]
})
export class MaterialModule { }
