import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/cliente/api-client.service';
import { ApiMascotaService } from 'src/app/services/mascota/api-mascota.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  //constructor(private router: Router) {}
  //#region
  goPageInicio() {
    this.router.navigate(['/dashboard']);
  }

  goPageRaza() {
    this.router.navigate(['/servicio/raza', 45]);
  }
  //#endregion
  // VARIABLES
  ok = true;
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    nombre: '',
    direccion: '',
    celular: '',
    correo: '',
    sexo: '',
    rol: '',
    nit: '',
    fecha_reg: '',
  };
  listData: Array<any> = [];
  textSearch: string = '';

  constructor(
    private apiMascotaService: ApiMascotaService,
    private apiClientService: ApiClientService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    celular: ['', Validators.required],
    correo: ['', Validators.required],
    sexo: ['', Validators.required],
    rol: ['cliente', Validators.required],
    nit: ['', Validators.required],
    fecha_reg: ['', Validators.required],
  });

  get nombre() {
    return this.formNewData.get('nombre');
  }
  get direccion() {
    return this.formNewData.get('direccion');
  }
  get celular() {
    return this.formNewData.get('celular');
  }
  get correo() {
    return this.formNewData.get('correo');
  }
  get sexo() {
    return this.formNewData.get('sexo');
  }
  get rol() {
    return this.formNewData.get('rol');
  }
  get nit() {
    return this.formNewData.get('nit');
  }
  get fecha_reg() {
    return this.formNewData.get('fecha_reg');
  }
  //el boton q esta en esquina X new form
  closeForm() {
    this.onShowComponentRaza = false;
  }
  //Boton de cerrar en el formulario update
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
  ngOnInit(): void {
    this.getAllData();
  }

  //-----

  getAllData(): void {
    this.apiClientService.getAllData().subscribe((data) => {
      this.listData = data;
    });
  }

  btnAddData() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }

  //cuando envies el formulario de new cliente
  submitDataForm() {
    const { nombre, direccion, celular, correo, sexo, rol, nit, fecha_reg } =
      this.formNewData.value;
    const body = {
      nombre: nombre ?? '',
      direccion: direccion ?? '',
      celular: celular ?? '',
      correo: correo ?? '',
      sexo: sexo ?? '',
      rol: rol ?? '',
      nit: nit ?? '',
      fecha_reg: fecha_reg ?? '',
    };
    this.apiClientService.createData(body).subscribe((data) => {
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
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.patchValue({
      ...body,
    });
  }
  // form update submit
  submitUpdateData(): void {
    const { id } = this.bodyUpdate;
    const { nombre, direccion, celular, correo, sexo, rol, nit, fecha_reg } =
      this.formNewData.value;
    const body = {
      id,
      nombre: nombre ?? '',
      direccion: direccion ?? '',
      celular: celular ?? '',
      correo: correo ?? '',
      sexo: sexo ?? '',
      rol: rol ?? '',
      nit: nit ?? '',
      fecha_reg: fecha_reg ?? '',
    };
    this.apiClientService.updateData(body).subscribe((data) => {
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

  //delete Data
  deleteDataTable(id: number) {
    //alert(id);
    this.apiClientService.deleteData(id).subscribe((data) => {
      //this.listData = this.listData.filter((post) => post.id !== id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      //alert(data.message);
      this.getAllData();
    });
  }
}
