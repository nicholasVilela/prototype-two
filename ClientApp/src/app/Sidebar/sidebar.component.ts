import { Component } from "@angular/core";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    channels: string[] = ['Public', 'Other', 'Self']
    currChannel: string = 'Public'

    switchChannel(channel) {
        if(channel === 'Public') {
            this.currChannel = this.channels[0]
        }
        else if(channel === 'Other') {
            this.currChannel = this.channels[1]
        }
        else if(channel === 'Self') {
            this.currChannel = this.channels[2]
        }
    }
}