import { Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { SidebarComponent } from './Sidebar/sidebar.component'
import * as signalR from '@aspnet/signalr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  public: string = 'Public'
  other: string = 'Other'
  self: string = 'Self'

  @ViewChild(SidebarComponent) sidebarComp

  currChannel: string

  setChannel(channel) {
    console.log('ahh')
    this.currChannel = channel
    console.log(channel)
  }

  ngAfterViewInit() {
    this.currChannel = this.sidebarComp.currChannel
  }
}