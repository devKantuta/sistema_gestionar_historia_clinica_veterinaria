import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { calcularEdadDetallada } from 'src/app/helpers/helper';
import { ApiRazaService } from 'src/app/services/api-raza/api-raza.service';
import { ApiClientService } from 'src/app/services/cliente/api-client.service';
import { ApiMascotaService } from 'src/app/services/mascota/api-mascota.service';
import { ApiSpecieService } from 'src/app/services/specie/api-specie.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
})
export class MascotaComponent {
  // VARIABLES
  ok: boolean = true;
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    id_cliente:0,
    id_raza:0,
    nombre:'',
    edad: '',
    sexo:'',
    color:'',
    fecha_reg:'',
  };
  listData: Array<any> = [];
  textSearch: string = '';
  listaCLientes: Array<any> = [];
  listaRazas: Array<any> = [];
  listaEspecies: Array<any> = [];

  constructor(
    private apiMascotaService: ApiMascotaService,
    private apiClienteService: ApiClientService,
    private apiRazaService: ApiRazaService,
    private apiEspecieService: ApiSpecieService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    id_cliente: ['', Validators.required],
    id_raza: ['', Validators.required],
    nombre: ['', Validators.required],
    sexo: ['', Validators.required],
    color: ['', Validators.required],
    fecha_reg: ['', Validators.required],
    id_especie: ['', Validators.required],
  });

  get id_cliente() {
    return this.formNewData.get('id_cliente');
  }
  get id_raza() {
    return this.formNewData.get('id_raza');
  }
  get nombre() {
    return this.formNewData.get('nombre');
  }
  /* get edad() {
    return this.formNewData.get('edad');
  } */
  get sexo() {
    return this.formNewData.get('sexo');
  }
  get color() {
    return this.formNewData.get('color');
  }
  get fecha_reg() {
    return this.formNewData.get('fecha_reg');
  }
  get id_especie() {
    return this.formNewData.get('id_especie');
  }

  closeForm() {
    this.onShowComponentRaza = false;
  }

  ngOnInit(): void {
    this.getAllData();
    this.getDataClientes();
    this.getDataEspecies();
    this.getDataRazas();
  }

  // LISTAS DE CLIENTES , RAZAS Y ESPECIES
  getDataClientes() {
    this.apiClienteService.getAllData().subscribe((data) => {
      this.listaCLientes = data;
    });
  }
  getDataRazas() {
    this.apiRazaService.getAllData().subscribe((data) => {
      this.listaRazas = data;
    });
  }

  getDataEspecies() {
    this.apiEspecieService.getAllData().subscribe((data) => {
      this.listaEspecies = data;
    });
  }

  //-----

  getAllData(): void {
    this.apiMascotaService.getAllData().subscribe((data) => {
      this.listData = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiMascotaService.deleteData(id).subscribe((data) => {
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

  btnAddData() {
    this.onShowComponentRaza = !this.onShowComponentRaza;
    this.formNewData.reset();
  }

  //cuando envies el formulario de raza
  submitDataForm() {
    const { id_cliente, id_raza, nombre, sexo, color, fecha_reg } = this.formNewData.value;
    
    //const edad = calcularEdadDetallada('1995');
    const edad = fecha_reg ? calcularEdadDetallada(fecha_reg):'0 años'
    const body = {
      id_cliente: Number(id_cliente),// en realidad es id_persona
      id_raza: Number(id_raza),
      nombre: nombre ?? '',
      sexo: sexo ?? '',
      edad: edad,
      color: color ?? '',
      fecha_reg: fecha_reg ?? '',
    };
    this.apiMascotaService.createData(body).subscribe((data) => {
      Swal.fire({
        position: 'top-end',
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
      nombre: this.bodyUpdate.nombre,
      color:this.bodyUpdate.color,
      fecha_reg: this.bodyUpdate.fecha_reg,
    })
    this.showUpdateComponent = !this.showUpdateComponent;
    //this.formNewData.reset();
    
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
  submitUpdateData(): void {
    const { id_cliente, id_raza, nombre,sexo, color, fecha_reg,id_especie } = this.formNewData.value;

    const edad = fecha_reg ? calcularEdadDetallada(fecha_reg): '0 años'
    const body = {
      id: Number(this.bodyUpdate.id),
      id_cliente: Number(id_cliente),
      id_raza: Number(id_raza),
      nombre: nombre ?? '',
      edad: edad,
      sexo: sexo ?? '',
      color: color ?? '',
      fecha_reg: fecha_reg ?? '',
      id_especie:Number(id_especie),
    };
    this.apiMascotaService.updateData(body).subscribe((data) => {
      Swal.fire({
        position: 'top-end',
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
