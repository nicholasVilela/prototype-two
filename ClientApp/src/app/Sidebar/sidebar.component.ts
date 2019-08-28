import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import * as signalR from '@aspnet/signalr'

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
    channels: string[] = ['Public', 'Other', 'Self']
    currChannel: string
    @Output() currChannelEvent = new EventEmitter()
    
    changeChannel(channel) {
        if (channel === 'Public') {
            this.currChannel = channel
            // console.log(this.currChannel)
            // this.emitChannel()
        }
        else if (channel === 'Other') {
            this.currChannel = channel
            // console.log(this.currChannel)
            // this.emitChannel()
        }
        else if (channel === 'Self') {
            this.currChannel = channel
            // console.log(this.currChannel)
            // this.emitChannel()
        }   
    }

    emitChannel(channel) {
        this.currChannelEvent.emit(channel)
        // console.log(this.currChannel)
    }
}
