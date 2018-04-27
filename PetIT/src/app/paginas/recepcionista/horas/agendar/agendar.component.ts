import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {

  @ViewChild('bottomSheetModal') bottomSheetModal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
  dismissible: false, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '100%', // Starting top style attribute
  endingTop: '10%', // Ending top style attribute
  ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
    console.log('Ready');
    console.log(modal, trigger);
  },
  complete: () => { 
    console.log('Closed'); 
  } // Callback for Modal close
};

  constructor(private router:Router, private toastService:MzToastService) { }

  ngOnInit() {
  	console.log("AgendarComponent");
  }

  public volver():void {
    console.log("volver");
    this.router.navigate(['/recepcionista/horas/buscar']);
  }

  public reservar():void {
  	console.log("reservar");
    this.bottomSheetModal.open();
  }
  public agendarHora(): void {
    console.log("agendarHora");
    this.bottomSheetModal.close();
    this.toastService.show('¡Hora agendada correctamente!', 4000, 'green');
    this.router.navigate(['/recepcionista/horas/finalizar']);
  }

}
