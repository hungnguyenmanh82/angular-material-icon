import { BootstrapIconComponent } from './bootstrap-icon/bootstrap-icon.component';
import { MaterialButtonIconComponent } from './material-button-icon/material-button-icon.component';
import { MaterialIconComponent } from './material-icon/material-icon.component';
import { IconComponent } from './icon/icon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // full: nghĩa là dùng redirect path
  { path: '', pathMatch: 'full', redirectTo: 'icon' },
  { path: 'icon', component: IconComponent },
  { path: 'material-icon', component: MaterialIconComponent },
  { path: 'material-button-icon', component: MaterialButtonIconComponent },
  { path: 'bootstrap-icon', component: BootstrapIconComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
