import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from './icon/icon.component';
import { MaterialIconComponent } from './material-icon/material-icon.component';
import { MaterialButtonIconComponent } from './material-button-icon/material-button-icon.component';

@NgModule({
  declarations: [AppComponent, IconComponent, MaterialIconComponent, MaterialButtonIconComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    /** order of Routes rất quan trọng */
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
