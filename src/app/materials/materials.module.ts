import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';

const materials = [
  MatButtonModule,
  MatSidenavModule,
  MatButtonModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialsModule { }
