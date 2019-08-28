import { Component, OnInit, Input } from '@angular/core'
import * as signalR from '@aspnet/signalr'

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    user: string = 'Nicholas'
    message: string = ''
    messages: string[] = []
    @Input('channel') channelName: string
    connection = new signalR.HubConnectionBuilder()
        .withUrl('/chathub')
        .build()    

    sendMessage() {
        this.connection
            .invoke("SendChannelMessage", this.channelName, this.user, this.message)
            .then(() => console.log(this.message))
            .then(() => this.message = '')
            .catch(err => console.log(err))
    }
    
    joinChannel() {
        this.connection
            .invoke("JoinChannel", this.channelName)
    }

    sendData(thing) {
        console.log('ahh')
    }

    setup() {
        this.connection
            .start()
            .then(() => console.log('Connection Successful'))
            .catch(err => console.log(err))

        this.connection
            .on("ReceiveMessage", (user: string, message: string) => {
                const text = `${user}: ${message}`
                this.messages.push(text)
            })

        // console.log(this.channel)

        // this.user = window.prompt('Enter your name', 'Nicholas')
    }

    ngOnInit() {
    }
}