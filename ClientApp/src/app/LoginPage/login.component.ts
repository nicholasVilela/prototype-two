import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    provider = new firebase.auth.GoogleAuthProvider()
    authorized = false

    login() {
        firebase.auth().signInWithPopup(this.provider)
            .then(res => {
                const token = (<any>res).credential.accessToken
                const user = res.user    
                this.authorized = true
                console.log(user)
            })
            .catch(err => console.log(err))
    }
}