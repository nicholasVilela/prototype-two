import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  user = ''
  message = ''
  messages: string[] = []
  groups = document.querySelector('#group')
  connection = new signalR.HubConnectionBuilder()
    .withUrl('/chathub')
    .build()

  sendMessage() {
    const groups = document.querySelector('#group')
    const groupValue = groups.options[groups.selectedIndex].value

    if (groupValue === 'PrivateGroup') {
      this.connection
        .invoke("SendGroupMessage", 'PrivateGroup', this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))
    }
    else if (groupValue === 'All') {
      this.connection
        .invoke("SendMessage", this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))
    }
    else if (groupValue === 'Self') {
      this.connection
        .invoke("SendSelfMessage", this.user, this.message)
        .then(() => this.message = '')
        .catch(err => console.log(err))
    }
  }

  joinGroup() {
    this.connection
      .invoke("JoinGroup", 'PrivateGroup')
      .then(() => console.log('Joined Private Group'))
      .catch(err => console.log(err))
  }

  setup() {
    this.connection 
      .start()
      .then(() => console.log('Connection successful!'))
      .catch(err => console.log(err))

    this.connection
      .on("ReceiveMessage", (user: string, message: string) => {
        const text = `${user}: ${message}`
        this.messages.push(text)
        console.log(this.messages)
      })
  }

  ngOnInit() {
    this.user = window.prompt('What is your name?', 'Nicholas')
    this.setup()
  }
}
