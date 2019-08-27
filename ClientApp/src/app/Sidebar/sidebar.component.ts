import { Component, OnInit } from "@angular/core";
import { AppComponent } from '../app.component'

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    channels: string[] = ['Public', 'Other', 'Self']

    changeChannel() {
        console.log(this.channels)
    }
}