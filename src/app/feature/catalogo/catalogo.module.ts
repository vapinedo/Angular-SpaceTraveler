import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CatalogoRoutingModule } from './catalogo-routing.module';

import { CatalogoComponent } from './catalogo.component';

const modules = [
  CommonModule,
  SharedModule,
  CatalogoRoutingModule
];

const components = [
  CatalogoComponent,
]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class CatalogoModule { }
