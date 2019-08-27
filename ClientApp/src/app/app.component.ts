import { Component, OnInit, ViewChild } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { SidebarComponent } from '../app/Sidebar/sidebar.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  user = ''
  message = ''
  publicMessages: string[] = []
  otherMessages: string[] = []
  selfMessages: string[] = []
  groups = document.querySelector('#group')
  connection = new signalR.HubConnectionBuilder()
    .withUrl('/chathub')
    .build()
  @ViewChild(SidebarComponent) Sidebar

  sendMessage() {
    if (this.Sidebar.currChannel === 'Public') {
      this.connection
        .invoke("SendGroupMessage", 'Public', this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))

      this.receiveMessage(this.publicMessages)
    }
    else if (this.Sidebar.currChannel === 'Other') {
      console.log(this.Sidebar.currChannel)
      this.connection
        .invoke("SendGroupMessage", 'Other', this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))

      this.receiveMessage(this.otherMessages)
    }
    else if (this.Sidebar.currChannel === 'Self') {
      console.log(this.Sidebar.currChannel)
      this.connection
        .invoke("SendSelfMessage", this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))

      this.receiveMessage(this.selfMessages)
    }
  }

  joinGroup(groupName) {
    this.connection
      .invoke("JoinGroup", groupName)
      .then(() => console.log(`Joined ${groupName}!`))
      .catch(err => console.log(err))
  }

  receiveMessage(channelMessages) {
    this.connection
      .on("ReceiveMessage", (user: string, message: string) => {
        const text = `${user}: ${message}`
        channelMessages.push(text)
      })
  }

  setup() {
    this.connection 
      .start()
      .then(() => console.log('Connection successful!'))
      .catch(err => console.log(err))
  }

  ngOnInit() {
    this.user = window.prompt('What is your name?', 'Nicholas')
    this.setup()
  }
}
