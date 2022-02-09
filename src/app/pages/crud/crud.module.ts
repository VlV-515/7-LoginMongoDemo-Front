import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
