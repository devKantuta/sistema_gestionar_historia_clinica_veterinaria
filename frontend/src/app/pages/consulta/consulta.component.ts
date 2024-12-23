import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiConsultaService } from 'src/app/services/consulta/api-consulta.service';
import { ApiEmpleadoService } from 'src/app/services/empleado/api-empleado.service';
import { ApiHcService } from 'src/app/services/hc/api-hc.service';

import { DatePipe } from '@angular/common';

import * as printJS from 'print-js';
import { calcularEdadDetallada, calcularEdadF_Nac_F_Actula, formatDate } from 'src/app/helpers/helper';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers:[DatePipe]
})
export class ConsultaComponent {
  // VARIABLES
  ok: boolean = true;
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate = {
    id: 0,
    id_hc: 0,
    id_empleado: 0,
    fecha_reg: '',
    peso: '',
    temperatura: '',
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    precio:0.00
  };
  listData: Array<any> = [];
  textSearch: string = '';
  //listaCLientes: Array<any> = [];
  listaHistorilaCli: Array<any> = [];
  listaEmpleados: Array<any> = [];

  constructor(
    private datePipe: DatePipe,
    private apiConsultaServive: ApiConsultaService,
    private apiEmpleadoService: ApiEmpleadoService,
    private apiHistorialClinico: ApiHcService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    id_hc: ['', Validators.required],
    id_empleado: ['', Validators.required],
    fecha_reg: ['', Validators.required],
    peso: ['', Validators.required],
    temperatura: ['', Validators.required],
    motivo: ['', Validators.required],
    diagnostico: ['', Validators.required],
    tratamiento: ['', Validators.required],
    precio: ['', Validators.required],
  });

  get id_hc() {
    return this.formNewData.get('id_hc');
  }
  get id_empleado() {
    return this.formNewData.get('id_empleado');
  }
  get fecha_reg() {
    return this.formNewData.get('fecha_reg');
  }
  get peso() {
    return this.formNewData.get('peso');
  }
  get temperatura() {
    return this.formNewData.get('temperatura');
  }
  get motivo() {
    return this.formNewData.get('motivo');
  }
  get diagnostico() {
    return this.formNewData.get('diagnostico');
  }
  get tratamiento() {
    return this.formNewData.get('tratamiento');
  }
  get precio() {
    return this.formNewData.get('precio');
  }

  closeForm() {
    this.onShowComponentRaza = false;
  }

  ngOnInit(): void {
    this.getAllData();
    //this.getDataClientes();
    this.getDataEmpleados();
    this.getDataHistorialClinico();
  }

  // LISTAS DE CLIENTES
  /*   getDataClientes() {
    this.apiClienteService.getAllData().subscribe((data) => {
      this.listaCLientes = data;
    });
  } */
  
  getDataEmpleados() {
    this.apiEmpleadoService.getAllData().subscribe((data) => {
      this.listaEmpleados = data;
    });
  }
  getDataHistorialClinico() {
    this.apiHistorialClinico.getAllData().subscribe((data) => {
      this.listaHistorilaCli = data;
    });
  }
  //-----

  getAllData(): void {
    this.apiConsultaServive.getAllData().subscribe((data) => {
      //console.log(data);
      this.listData = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiConsultaServive.deleteData(id).subscribe((data) => {
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
    //this.formNewData.reset();
    const fecha = new Date();
    const fechaFormat = this.datePipe.transform(fecha, 'yyyy/MM/dd')
    console.log(fechaFormat)
    this.formNewData.patchValue({
      fecha_reg:fechaFormat
    })
  
    
  }

  edadFechaNac(data: string): string {
    //const fecha = formatDate(data);
    
    return calcularEdadDetallada(data);
  }
  edadFechaNac_FechaCurrent(fecha1:string,fecha2:string) {
    return calcularEdadF_Nac_F_Actula(fecha1,fecha2)
  }
  //cuando envies el formulario de raza
  submitDataForm() {
    
    const {
      id_hc,
      id_empleado,
      peso,
      temperatura,
      motivo,
      diagnostico,
      fecha_reg,
      tratamiento,
      precio,
    } = this.formNewData.value;

    const body = {
      id_hc: Number(id_hc), // en realidad es id_persona
      id_empleado: Number(id_empleado),
      fecha_reg: fecha_reg ?? '',
      peso: peso ?? '',
      temperatura: temperatura ?? '',
      motivo: motivo ?? '',
      diagnostico: diagnostico ?? '',
      tratamiento: tratamiento ?? '',
      precio: Number(precio),
    };
    this.apiConsultaServive.createData(body).subscribe((data) => {
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

    /* this.formNewData.patchValue({
      peso: this.bodyUpdate.peso,
      temperatura: this.bodyUpdate.temperatura,
      diagnostico: this.bodyUpdate.diagnostico,
      fecha_reg: this.bodyUpdate.fecha_reg,
      motivo:this.bodyUpdate.motivo,
    }); */
    this.formNewData.patchValue({
      ...body,
    });
    this.showUpdateComponent = !this.showUpdateComponent;
    //this.formNewData.reset();
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
  submitUpdateData(): void {
    
    const {
      id_hc,
      id_empleado,
      fecha_reg,
      peso,
      temperatura,
      motivo,
      diagnostico,
      tratamiento,
      precio
    } = this.formNewData.value;

    const body = {
      id: Number(this.bodyUpdate.id),
      id_hc: Number(id_hc),
      id_empleado: Number(id_empleado),
      fecha_reg: fecha_reg ?? '',
      peso: peso ?? '',
      temperatura: temperatura ?? '',
      motivo: motivo ?? '',
      diagnostico: diagnostico ?? '',
      tratamiento: tratamiento ?? '',
      precio:Number(precio),
    };
    this.apiConsultaServive.updateData(body).subscribe((data) => {
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

  printData(jsonData: any) {
    /* 
      {
  "id": 6,
  "id_hc": 12,
  "id_empleado": 2,
  "fecha_reg": "2024-12-09T04:00:00.000Z",
  "peso": "3",
  "temperatura": "34",
  "motivo": "dolor de pta",
  "diagnostico": "inflamacion intra muscular ",
  "tratamiento": "complejo B en inyentable durante 2 semanas ",
  "num_hc": 591372,
  "veterinario": "juan maritenez"
}
    */
    //console.log(jsonData);
    const data = {
      fecha: formatDate(jsonData.fecha_reg),
      veterinario: jsonData.veterinario,
      'peso(kg)': jsonData.peso,
      'temperatura(°C)': jsonData.temperatura,
      motivo: jsonData.motivo,
      diagnostico: jsonData.diagnostico,
      tratamiento: jsonData.tratamiento,
      'precio(Bs)': jsonData.precio,
      ...jsonData
    }
    console.log(data);
    printJS({
      documentTitle: 'INFORMACION DE LA CONSULTA',
      printable: [data],
      properties: [
        'peso(kg)',
        'temperatura(°C)',
        'motivo',
        'diagnostico',
        'tratamiento',
        'precio(Bs)',
      ],
      type: 'json',
      header: `
        <section class="background"></section>
        <div class="h">
          <img src="assets/images/logo_vet.png"height="180px" alt="">
          <div class="datos">
            <h2>Dr. ${data.veterinario.toUpperCase()}</h2>
            <h3>Medico Veterinario</h3>
            <h3>Registro:23432</h3>
            <h3>Direccion: C. Boliviar-Montero</h3>

          </div>
        </div>
        <hr>
        <div class="datos" > 
          <h2>Cliente: ${data.cliente.toUpperCase()}</h2>
          <h3>Mascota: ${data.mascota.toUpperCase()}</h3>
          <h3>Edad: ${calcularEdadDetallada(data.fecha_nac)}</h3>
          <h3> Ficha Medica: ${data.hc}</h3>
          <h3>Fechas: ${data.fecha}</h3>        
        </div>
        <hr>   
      `,

      gridHeaderStyle:
        'color: #fff;font-family: Verdana,sans-serif;background: #4757e4; z-index: 12;',
      gridStyle: 'border: 1px solid #4757e4;text-align: center; z-index:12;',
      css: ['assets/css/printJs.css'],
    });
  }
}
