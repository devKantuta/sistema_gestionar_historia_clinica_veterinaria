import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/cliente/api-client.service';
import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';
import { ApiHorarioService } from 'src/app/services/horario/api-horario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent {
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
    id_turno: 0,
    fecha_reg: '',
  };
  listData: Array<any> = [];
  listDataTurnos: Array<any> = [];
  textSearch: string = '';

  constructor(
    
    
    private apiTurnoService: ApiHorarioService,
    private apiEmpleadoService : ApiEmpleadoService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    nombre: ['', Validators.required],
    direccion: ['', Validators.required],
    celular: ['', Validators.required],
    correo: ['', Validators.required],
    sexo: ['', Validators.required],
    rol: ['cliente', Validators.required],
    turno: ['', Validators.required],
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
  get turno() {
    return this.formNewData.get('turno');
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
    this.getDataTurnos();
  }
  getDataTurnos(): void{
    this.apiTurnoService.getApiHorarios().subscribe((data) => {
      this.listDataTurnos = data;
    })
  }
  //-----

  getAllData(): void {
    this.apiEmpleadoService.getAllData().subscribe((data) => {
      console.log(data)
      this.listData = data;
    });
  }

  btnAddData() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }

  //cuando envies el formulario de new cliente
  submitDataForm() {
    const {
      nombre,
      direccion,
      celular,
      correo,
      sexo,
      rol,
      turno,
      fecha_reg 
    } = this.formNewData.value;
    
    const body = {
      nombre: nombre ?? '',
      direccion: direccion ?? '',
      celular: celular ?? '',
      correo: correo ?? '',
      sexo: sexo ?? '',
      rol: rol ?? '',
      id_turno: Number(turno),
      fecha_reg: fecha_reg ?? '',
    };
    this.apiEmpleadoService.createData(body).subscribe((data) => {
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
  btnUpdateDataIcon(dataEmpleado: any) {
    this.bodyUpdate = dataEmpleado;
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.patchValue({
      ...dataEmpleado,
    });
  }
  // form update submit
  submitUpdateData(): void {
    const { id } = this.bodyUpdate;
    const { nombre, direccion, celular, correo, sexo, rol, turno, fecha_reg } =
      this.formNewData.value;
    const body = {
      id,
      nombre: nombre ?? '',
      direccion: direccion ?? '',
      celular: celular ?? '',
      correo: correo ?? '',
      sexo: sexo ?? '',
      rol: rol ?? '',
      id_turno: Number(turno),
      fecha_reg: fecha_reg ?? '',
    };
    this.apiEmpleadoService.updateData(body).subscribe((data) => {
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
    this.apiEmpleadoService.deleteData(id).subscribe((data) => {
      //this.listData = this.listData.filter((post) => post.id !== id);
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
}
