import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I_NewRaza, I_Raza } from 'src/app/interfaces/interfaces';
import { ApiRazaService } from 'src/app/services/api-raza/api-raza.service';

@Component({
  selector: 'app-new-raza',
  templateUrl: './new-raza.component.html',
  styleUrls: ['./new-raza.component.css']
})
export class NewRazaComponent {
  //CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private apiServiceRaza: ApiRazaService,
    private router:Router
  ) { }
  
  // VARIABLES
  onShowComponentRaza: boolean = true;

  // DATOS DE FORMULARIO
  formRaza = this.fb.group({
    nameraza:['',Validators.required],
    description:['',Validators.required],
  })

  get nameraza() {
    return this.formRaza.get('nameraza');
  }


  get description() {
    return this.formRaza.get('description');
  }

  closeFormRaza() {
    this.onShowComponentRaza = false;
  }
  
  submitRaza() {
  /*   this.apiServiceRaza.updateData({})
      .subscribe(
        (data) => {
          alert(data);
        }
    ) */
    this.onShowComponentRaza = !this.onShowComponentRaza;
  }





}
