
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ApiHorarioService } from 'src/app/services/horario/api-horario.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css'],
})
export class HorarioComponent {
  // VARIABLES
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    nombre:'',
    hora_ini: '',
    hora_fin: '',
  };
  listHorario: Array<any> = [];
  textSearch: string = '';


  constructor(
    
    private apiServiceHorario: ApiHorarioService,
    private router: Router,
    private fb: FormBuilder
  ) {
    
  }

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    nombre: ['', Validators.required],
    hora_ini: ['', Validators.required],
    hora_fin: ['', Validators.required],
  });

  get nombre() {
    return this.formNewData.get('nombre');
  }

  get hora_ini() {
    return this.formNewData.get('hora_ini');
  }
  get hora_fin() {
    return this.formNewData.get('hora_fin');
  }

  closeForm() {
    this.onShowComponentRaza = false;
  }

  ngOnInit(): void {
    this.getAllHorarios();
  }

  //-----

  getAllHorarios(): void {
    this.apiServiceHorario.getApiHorarios().subscribe((data) => {
      this.listHorario = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiServiceHorario.service_DeleteData(id).subscribe((data) => {
      //this.listHorario = this.listHorario.filter((post) => post.id !== id);
      alert(data.message);
      this.getAllHorarios();
      
    });
  }

  btnAddData() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }


  //cuando envies el formulario de raza
  submitDataForm() {
    const { nombre, hora_ini, hora_fin } = this.formNewData.value;
    const body = {
      nombre: nombre ?? '',
      hora_ini: hora_ini ?? '',
      hora_fin: hora_fin ?? ''
    }
    this.apiServiceHorario
      .createData(body).subscribe((data) => {
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        
        this.getAllHorarios();
      });
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }
  
  // click  en boton update 
  btnUpdateDataIcon(body: any) {
    this.bodyUpdate = body;
    this.formNewData.setValue({
      nombre: body.nombre,
      hora_ini: body.hora_ini,
      hora_fin: body.hora_fin
    })
    
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
  submitUpdateData(): void {
    const { nombre, hora_ini, hora_fin } = this.formNewData.value;
    const body = {
      id:this.bodyUpdate.id,
      nombre: nombre ?? '',
      hora_ini: hora_ini ?? '',
      hora_fin: hora_fin ?? '',
    };
    this.apiServiceHorario.updateData(body).subscribe((data) => {
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllHorarios();
    });
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
}
