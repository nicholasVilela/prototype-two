import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MainComponent } from './Main/main.component';
// import { AppComponent } from './app.component'
@NgModule({
  declarations: [
    MainComponent,
    // AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      // { path: '', component: AppComponent, pathMatch: 'full' },
      { path: '', component: MainComponent, pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
