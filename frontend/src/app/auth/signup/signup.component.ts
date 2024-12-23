import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone:false,
})
export class SignupComponent {
  // VARIABLES
  @Input() profesion: string = ''
  
  @Output() aPadreEvent = new EventEmitter<string>();
  //CREO UNA FUNCION PARA ENVIAR EL DATO MEDIANTE UN EVENTO
  sendata: string = "";
  sendEventData() {
    this.aPadreEvent.emit("soy tu hijo padre");
  }


}
