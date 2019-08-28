import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './Main/main.component'
import { SidebarComponent } from './Sidebar/sidebar.component'
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent, pathMatch: 'full' },
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: '', component: SidebarComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent, MainComponent, SidebarComponent]
})
export class AppModule { }
