import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSpecieService } from 'src/app/services/specie/api-specie.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-especie',
  templateUrl: './especie.component.html',
  styleUrls: ['./especie.component.css'],
})
export class EspecieComponent {
  // VARIABLES
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    nombre: '',
    descripcion: '',
  };

  listData: Array<any> = [];

  textSearch: string = '';

  constructor(
    private apiEspecieService: ApiSpecieService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    
  });

  get nombre() {
    return this.formNewData.get('nombre');
  }

  get descripcion() {
    return this.formNewData.get('descripcion');
  }
  
  closeForm() {
    this.onShowComponentRaza = false;
  }

  ngOnInit(): void {
    this.getAllData();
  }

  //-----

  getAllData(): void {
    this.apiEspecieService.getAllData().subscribe((data) => {
      this.listData = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiEspecieService.deleteData(id).subscribe((data) => {
      //alert(data.message);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllData();
    });
  }

  showFormRaza() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
  }

  //cuando envies el formulario de raza
  submitDataForm() {
    const { nombre, descripcion } = this.formNewData.value;
    const body = {
      nombre: nombre ?? '',
      descripcion: descripcion ?? '',
    };
    this.apiEspecieService.createData(body).subscribe((data) => {
      //alert(data.message);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllData();
    });
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }

  // click  en boton update
  btnUpdateDataIcon(body: any) {
    this.bodyUpdate = body;
    this.formNewData.patchValue({
      nombre: body.nombre,
      descripcion: body.descripcion
    });
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  submitUpdateData(): void {
    const { nombre,descripcion } = this.formNewData.value;;
    const editBody = {
      id: this.bodyUpdate.id,
      nombre: nombre  ?? '',
      descripcion: descripcion ?? ''
    }
    this.apiEspecieService.updateData(editBody).subscribe((data) => {
      //alert(data.message);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllData();

    });
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
}
