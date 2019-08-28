import { Component, OnInit, Input } from '@angular/core'
import * as signalR from '@aspnet/signalr'

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
    channels: string[] = ['Public', 'Other', 'Self']
    currChannel: string
    

    changeChannel(channel) {
        if (channel === 'Public') {
            this.currChannel = channel
        }
        else if (channel === 'Other') {
            this.currChannel = channel
        }
        else if (channel === 'Self') {
            this.currChannel = channel
        }
    }
}
