import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TheoryPageRoutingModule } from './theory-routing.module';

import { TheoryPage } from './theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TheoryPageRoutingModule
  ],
  declarations: [TheoryPage]
})
export class TheoryPageModule {}
