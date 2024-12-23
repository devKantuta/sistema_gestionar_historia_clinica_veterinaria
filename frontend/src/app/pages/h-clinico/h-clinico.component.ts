import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { idUniqueBasee36, incrementNro } from 'src/app/helpers/helper';
import { ApiHcService } from 'src/app/services/hc/api-hc.service';
import { ApiMascotaService } from 'src/app/services/mascota/api-mascota.service';
import * as printJS from 'print-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-h-clinico',
  templateUrl: './h-clinico.component.html',
  styleUrls: ['./h-clinico.component.css'],
})
export class HClinicoComponent {
  // VARIABLES
  ok: boolean = true;
  onShowComponentRaza: boolean = false;
  showUpdateComponent: boolean = false;
  bodyUpdate?: any;
  
  tiposDeSangre:Array<any> = [
    {
      id: 1,
      tipo: 'Canis lupus familiaris - DEA 1.1+',
      nombre: 'DEA 1.1 positivo',
    },
    {
      id: 2,
      tipo: 'Canis lupus familiaris - DEA 1.1-',
      nombre: 'DEA 1.1 negativo',
    },
    { id: 3, tipo: 'Canis lupus familiaris - DEA 3', nombre: 'DEA 3' },
    { id: 4, tipo: 'Canis lupus familiaris - DEA 4', nombre: 'DEA 4' },
    { id: 5, tipo: 'Felis catus - Tipo A', nombre: 'Tipo A' },
    { id: 6, tipo: 'Felis catus - Tipo B', nombre: 'Tipo B' },
    { id: 7, tipo: 'Felis catus - Tipo AB', nombre: 'Tipo AB' },
    { id: 8, tipo: 'Oryctolagus cuniculus - Tipo 1', nombre: 'Tipo 1' },
    { id: 9, tipo: 'Oryctolagus cuniculus - Tipo 2', nombre: 'Tipo 2' },
    { id: 10, tipo: 'Mustela putorius furo - Único', nombre: 'Único' },
    { id: 11, tipo: 'Aves - Tipo A', nombre: 'Tipo A' },
    { id: 12, tipo: 'Aves - Tipo B', nombre: 'Tipo B' },
    { id: 13, tipo: 'Equus ferus caballus - Sistema Aa', nombre: 'Sistema Aa' },
    { id: 14, tipo: 'Equus ferus caballus - Sistema Qa', nombre: 'Sistema Qa' },
    { id: 15, tipo: 'Equus ferus caballus - Sistema E', nombre: 'Sistema E' },
    { id: 16, tipo: 'Bos taurus - Grupo A', nombre: 'Grupo A' },
    { id: 17, tipo: 'Bos taurus - Grupo B', nombre: 'Grupo B' },
    { id: 18, tipo: 'Bos taurus - Grupo O', nombre: 'Grupo O' },
  ];
  listDataMascotas: Array<any> = [];
  copyDataMascotas: Array<any> = [];

  listData: Array<any> = [];

  listDataClientes: Array<any> = [];
  textSearch: string = '';

  //variable para agarra el fomulario update
  @ViewChild('formUpdate') printForm?: ElementRef;
  constructor(
    private apiH_CService: ApiHcService,
    private apiMascotaService: ApiMascotaService,
    private fb: FormBuilder
  ) {}

  // DATOS DE FORMULARIO
  formNewData = this.fb.group({
    mascota: ['', Validators.required],
    cliente: ['', Validators.required],
    num_hc: ['', Validators.required],
    fecha_reg: ['', Validators.required],
    t_sangre: ['', Validators.required],
    alergia: ['', Validators.required],
  });

  get mascota() {
    return this.formNewData.get('mascota');
  }
  get num_hc() {
    return this.formNewData.get('num_hc');
  }
  get fecha_reg() {
    return this.formNewData.get('fecha_reg');
  }
  get cliente() {
    return this.formNewData.get('cliente');
  }
  get t_sangre() {
    return this.formNewData.get('t_sangre');
  }
  get alergia() {
    return this.formNewData.get('alergia');
  }

  closeForm() {
    this.onShowComponentRaza = false;
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllDataMascotas();
  }

  //- OBTENIENDO TODAS LAS MASCOTAS
  getAllDataMascotas() {
    this.apiMascotaService.getAllData().subscribe((data) => {
      
      this.copyDataMascotas = data;
      this.getDataNameMascotas(data);
    });
  }
  //-----
  getDataNameMascotas(data: Array<any>) {
    const nombreUnicosMascota = data.filter((mascota, indice, copyArray) => {
      const currentIndice = copyArray.findIndex(
        (m) => m.nombre === mascota.nombre
      );
      return currentIndice === indice;
    });
    console.log('nombreUnicos:',nombreUnicosMascota);
    this.listDataMascotas = nombreUnicosMascota;
    
  }
  getNameMascota() {
    const id_mascota = this.mascota?.value;
    const nameMascota = this.listDataMascotas.filter(
      (m) => m.id === Number(id_mascota)
    )[0].nombre;
    //console.log("nameMascota:",nameMascota);
    //console.log(this.copyDataMascotas);
    this.listDataClientes = this.copyDataMascotas.filter(
      (mascota) => mascota.nombre === nameMascota
    );
    //console.log("listaClientes:",this.listDataClientes)
  }

  //--------------------
  getAllData(): void {
    this.apiH_CService.getAllData().subscribe((data) => {
      
      this.listData = data;
    });
  }

  //delete Data
  deleteDataTable(id: number) {
    this.apiH_CService.deleteData(id).subscribe((data) => {
      //this.listData = this.listData.filter((post) => post.id !== id);
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
    const { num_hc, fecha_reg, t_sangre, alergia ,cliente} = this.formNewData.value;
    
    const body = {
      id_mascota: Number(cliente),
      fecha_reg: fecha_reg ?? '',
      num_hc: num_hc ?? '',
      t_sangre: t_sangre ?? '',
      alergia: alergia ?? '',
    };
    this.apiH_CService.createData(body).subscribe((data) => {
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
    console.log(this.bodyUpdate)
    this.formNewData.patchValue({
      mascota: body.id_mascota,
      num_hc: body.num_hc,
      fecha_reg: body.fecha_reg,
      t_sangre: body.t_sangre,
      alergia: body.alergia,
      
    });
    this.showUpdateComponent = !this.showUpdateComponent;
  }
  //Boton de cerrar en el formulario
  closeFormRazaUpdate() {
    this.showUpdateComponent = !this.showUpdateComponent;
    this.formNewData.reset();
  }
  submitUpdateData(): void {
    const { mascota, num_hc, fecha_reg ,t_sangre,alergia ,cliente} = this.formNewData.value;
    const body = {
      id: this.bodyUpdate.id,
      id_mascota: Number(cliente),
      num_hc: Number(num_hc),
      fecha_reg: fecha_reg ?? '',
      t_sangre: t_sangre ?? '',
      alergia: alergia ?? '',
    };
    this.apiH_CService.updateData(body).subscribe((data) => {
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

  crear_hc() {
    this.apiH_CService.getNroFicha().subscribe((data) => {
      
      const nroUpdate =  data[0].max
      const numero_hc = incrementNro(nroUpdate);
      this.formNewData.patchValue({
        num_hc: numero_hc.toString(),
      });
    })
  }

  printData(jsonData: any) {
    //{id: 12, id_mascota: 7, fecha_reg: '2024-12-09T04:00:00.000Z', num_hc: 591372, mascota: 'kira'}
    printJS({
      documentTitle: 'INFORMACION DE HISTORIA CLINICA',
      printable: [jsonData],
      properties: ['mascota', 'num_hc', 'fecha_reg'],
      type: 'json',
      header: '<h1> Información del Historia Clinica </h1>',
    });
  }
}
