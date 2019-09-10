import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'
import * as signalR from '@aspnet/signalr'

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{
    user: string = 'User'
    message: string = ''
    messages = []
    currChannel: string = ''
    channels: string[] = ['Public', 'Other', 'Self']
    joinedChannels = []
    showPublic = false
    showOther = false
    showSelf = false

    connection = new signalR.HubConnectionBuilder()
        .withUrl('/chathub')
        .build()

    firebaseConfig = {
        apiKey: "AIzaSyDQBb0Jb6pbblJbukn8Dg-TGYVCdYMl1GQ",
        authDomain: "prototype-two.firebaseapp.com",
        databaseURL: "https://prototype-two.firebaseio.com",
        projectId: "prototype-two",
        storageBucket: "",
        messagingSenderId: "762987761350",
        appId: "1:762987761350:web:7a3203893ed5f96a"
    }

    app = !firebase.apps.length ? firebase.initializeApp(this.firebaseConfig) : firebase.app()
    database = firebase.database()

    sendMessage() {
        if (this.currChannel != 'Self') {
            this.connection
                .invoke("SendChannelMessage", this.currChannel, this.user, this.message)
                .then(() => this.message = '')
                .catch(err => console.log(err)) 
            this.addMessageToDB(this.currChannel, this.user, this.message)
        }
        else { 
            this.connection
                .invoke("SendSelfMessage", this.user, this.message)
                .then(() => this.message = '')
                .catch(err => console.log(err))

            this.addMessageToDB(this.currChannel, this.user, this.message)
        }
    }

    addMessageToDB(channel: string, user: string, message: string) {
        console.log('ADDED')
        const messageData = {
            username: user,
            channel: channel,
            message: message
        }

        console.log(channel)
        console.log(user)
        console.log(message)

        const messageKey = this.database.ref().child(channel).push().key

        const updates = {}
        updates[`${channel}/messages/${messageKey}`] = messageData
        
        this.database.ref().update(updates)
    }

    readMessagesFromDB(channel) {
        this.messages = []
        const channelMessages = this.database
            .ref(`${channel}`)
            .once('value')
            .then(snapshot => {
                snapshot.forEach(messageList => {
                    messageList.forEach(message => {
                        const text = message.val().username + ': ' + message.val().message
                        this.messages.push(text)
                    })
                })
            })
        return channelMessages
    }
    
    joinChannel(channel) {
        this.connection
            .invoke("JoinChannel", channel, this.user, `${this.user} has joined the channel ${channel}`)

        this.joinedChannels.push(channel)
    }

    changeChannel(channel) {
        if (channel === 'Public') {
            this.currChannel = channel
            this.showPublic = true
            this.showOther = false
            this.showSelf = false
            this.readMessagesFromDB(channel)
        }
        else if (channel === 'Other') {
            this.currChannel = channel
            this.showPublic = false
            this.showOther = true
            this.showSelf = false
            this.readMessagesFromDB(channel)
        }
        else if (channel === 'Self') {
            this.currChannel = channel
            this.showPublic = false
            this.showOther = false
            this.showSelf = true
            this.readMessagesFromDB(channel)
        }  
        
        if (!this.joinedChannels.includes(channel)) {
            this.joinChannel(channel)
        }
    }

    setup() {
        this.connection
            .start()
            .then(() => console.log('Connection Successful'))
            .then(() => this.user = window.prompt('What is your name?', 'Nicholas'))
            .catch(err => console.log(err))

        this.connection
            .on("ReceiveMessage", (user: string, message: string) => {
                const text = `${user}: ${message}`
                this.messages.push(text)
            }) 
    }

    ngOnInit() {
        this.setup()
    }
}